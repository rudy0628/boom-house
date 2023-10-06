package com.boomhouse.boomhouse.rest;

import com.boomhouse.boomhouse.entity.Favorite;
import com.boomhouse.boomhouse.entity.House;
import com.boomhouse.boomhouse.service.FavoriteService;
import com.boomhouse.boomhouse.service.HouseService;
import com.boomhouse.boomhouse.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = {"https://boom-house.vercel.app", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private FavoriteService favoriteService;
    private HouseService houseService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService, HouseService houseService) {
        this.favoriteService = favoriteService;
        this.houseService = houseService;
    }

    @GetMapping("/find")
    public boolean isUserFavoriteOrNot(
            @RequestParam String houseId,
            @RequestParam String userEmail) throws Exception {
        Favorite theFavorite = favoriteService.findFavorite(houseId, userEmail);

        return theFavorite != null;
    }

    @PostMapping("/secure")
    public void addOrRemoveFavorite(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody Favorite favorite) throws Exception {
        String userEmail = ExtractJWT.getUserInfo(token, "email");

        if(userEmail == null) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        // check if is favorite or not
        Favorite theFavorite = favoriteService.findFavorite(favorite.getHouseId(), favorite.getUserEmail());

        // find house
        House theHouse = houseService.findHouseById(UUID.fromString(favorite.getHouseId()));

        if(theFavorite != null) {
            favoriteService.removeFavorite(theFavorite.getId());

            // favorite count - 1
            theHouse.setFavoriteCount(theHouse.getFavoriteCount() - 1);
            houseService.postHouse(theHouse);
        } else {
            favoriteService.addFavorite(favorite);

            // favorite count + 1
            theHouse.setFavoriteCount(theHouse.getFavoriteCount() + 1);
            houseService.postHouse(theHouse);
        }
    }
}
