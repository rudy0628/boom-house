package com.boomhouse.boomhouse.rest;

import com.boomhouse.boomhouse.entity.Favorite;
import com.boomhouse.boomhouse.entity.House;
import com.boomhouse.boomhouse.responsemodels.AllHousesAddressResponse;
import com.boomhouse.boomhouse.service.FavoriteService;
import com.boomhouse.boomhouse.service.HouseService;
import com.boomhouse.boomhouse.service.ReviewService;
import com.boomhouse.boomhouse.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = {"https://boom-house.vercel.app", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/api/houses")
public class HouseController {
    private HouseService houseService;
    private ReviewService reviewService;
    private FavoriteService favoriteService;

    @Autowired
    public HouseController(HouseService houseService, ReviewService reviewService, FavoriteService favoriteService) {
        this.houseService = houseService;
        this.reviewService = reviewService;
        this.favoriteService = favoriteService;
    }

    @GetMapping("/favorite/{userEmail}")
    public List<House> findFavoriteHousesByUserEmail(@PathVariable("userEmail") String userEmail) throws Exception {
        List<Favorite> theFavorites = favoriteService.findFavoritesByEmail(userEmail);

        List<House> theHouses = new ArrayList<>();
        for(int i = 0 ; i < theFavorites.size() ; i++)  {
            String houseId = theFavorites.get(i).getHouseId();

            House theHouse = houseService.findHouseById(UUID.fromString(houseId));

            theHouses.add(theHouse);
        }

        return theHouses;
    }

    @GetMapping("/find/{userEmail}")
    public List<House> findHousesByUserEmail(@PathVariable("userEmail") String userEmail) {
        List<House> theHouses = houseService.findHousesByUserEmail(userEmail);

        return theHouses;
    }

    @GetMapping("/find/popular")
    public List<House> findTop3FavoritesHouses() {
        List<House> theHouses = houseService.findTop3FavoritesHouses();

        return theHouses;
    }

    @GetMapping("/address")
    public List<AllHousesAddressResponse> findAllHousesAddressWithoutPage() {
        List<AllHousesAddressResponse> theHouses = houseService.findAllHousesAddressWithoutPage();

        return theHouses;
    }

    @GetMapping("/find")
    public Page<House> findHouseByAddressAndHouseType(
            @RequestParam String address,
            @RequestParam String houseType,
            @RequestParam String rating,
            @RequestParam String sortBy,
            @RequestParam String descOrAsc,
            @RequestParam String content,
            @RequestParam String page,
            @RequestParam String size
    ) {
        Page<House> theHouses = houseService.findHousesByFilteringAndSorting(
                address, houseType, rating, sortBy, descOrAsc, content, page, size
        );

        return theHouses;
    }

    @PostMapping("/secure")
    public UUID postHouse(@RequestHeader(value = "Authorization") String token, @RequestBody House house) throws Exception {
        String userEmail = ExtractJWT.getUserInfo(token, "email");

        if(userEmail == null) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        // set the user email using token
        house.setUserEmail(userEmail);

        // set favorite count to 0
        house.setFavoriteCount(0);

        UUID houseId = houseService.postHouse(house);

        return houseId;
    }

    @PutMapping("/secure/{id}")
    public void updateHouse(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody House house,
            @PathVariable("id") UUID id) throws Exception
    {
        String userEmail = ExtractJWT.getUserInfo(token, "email");

        House theHouse = houseService.findHouseById(id);

        if(!theHouse.getUserEmail().equals(userEmail)) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        // For update purpose
        house.setId(id);
        house.setUserEmail(userEmail);

        // set favorite count to previous count
        house.setFavoriteCount(theHouse.getFavoriteCount());

        houseService.postHouse(house);
    }

    @DeleteMapping("/secure/{houseId}")
    public void deleteHouse(
            @RequestHeader(value = "Authorization") String token,
            @PathVariable("houseId") UUID houseId) throws Exception
    {
        String userEmail = ExtractJWT.getUserInfo(token, "email");

        // Find and check if the user own the house post
        House theHouse = houseService.findHouseById(houseId);

        if(!theHouse.getUserEmail().equals(userEmail)) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        // delete reviews by house id
        reviewService.deleteReviewsByHouseId(houseId.toString());

        // remove likes by houseId
        favoriteService.deleteFavoritesByHouseId(houseId.toString());

        // delete house
        houseService.deleteHouse(houseId);
    }
}
