package com.boomhouse.boomhouse.service;

import com.boomhouse.boomhouse.dao.HouseRepository;
import com.boomhouse.boomhouse.entity.House;
import com.boomhouse.boomhouse.responsemodels.AllHousesAddressResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class HouseService {

    private HouseRepository houseRepository;

    @Autowired
    public HouseService(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }

    public House findHouseById(UUID id) throws Exception{
        Optional<House> house = houseRepository.findById(id);

        if(house.isEmpty()) {
            throw new Exception("House not found!");
        }

        return house.get();
    }

    public UUID postHouse(House house) {
        House newHouse = houseRepository.save(house);

        // refresh
        houseRepository.flush();

        // get new house id
        return newHouse.getId();
    }

    public void deleteHouse(UUID id) throws Exception{
        Optional<House> house = houseRepository.findById(id);

        if(house.isEmpty()) {
            throw new Exception("House not found!");
        }

        houseRepository.delete(house.get());
    }

    public Page<House> findHousesByFilteringAndSorting(
            String address,
            String houseType,
            String rating,
            String sortBy,
            String descOrAsc,
            String content,
            String page,
            String size
    ) {
        Pageable thePageable = PageRequest.of(
                Integer.parseInt(page),
                Integer.parseInt(size),
                Sort.by(sortBy).descending()
        );

        if(descOrAsc.equals("asc")) {
            thePageable = PageRequest.of(
                    Integer.parseInt(page),
                    Integer.parseInt(size),
                    Sort.by(sortBy).ascending()
            );
        }

        Page<House> theHouses = houseRepository.findHousesByFilteringAndSorting(address, houseType,
                rating, content, thePageable);

        return theHouses;
    }

    public List<House> findTop3FavoritesHouses() {
        List<House> theHouses = houseRepository.findTop3FavoritesHouses();

        return theHouses;
    }

    public List<AllHousesAddressResponse> findAllHousesAddressWithoutPage() {
        List<AllHousesAddressResponse> theHouses = houseRepository.findAllHousesAddressWithoutPage();

        return theHouses;
    }

    public List<House> findHousesByUserEmail(String userEmail) {
        List<House> theHouses = houseRepository.findHousesByUserEmail(userEmail);

        return theHouses;
    }
}
