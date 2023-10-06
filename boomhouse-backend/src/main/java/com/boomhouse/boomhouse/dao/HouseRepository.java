package com.boomhouse.boomhouse.dao;

import com.boomhouse.boomhouse.entity.House;
import com.boomhouse.boomhouse.responsemodels.AllHousesAddressResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface HouseRepository extends JpaRepository<House, UUID> {

    @Query("SELECT h FROM House h " +
            "WHERE address LIKE CONCAT('%',:house_address,'%') AND " +
            "houseType LIKE CONCAT('%',:house_type,'%') AND " +
            "rating >= :house_rating AND " +
            "(address LIKE CONCAT('%',:house_content,'%') OR " +
            "title LIKE CONCAT('%',:house_content,'%') OR " +
            "description LIKE CONCAT('%',:house_content,'%'))")
    Page<House> findHousesByFilteringAndSorting(
            @Param("house_address") String address,
            @Param("house_type") String houseType,
            @Param("house_rating") String rating,
            @Param("house_content") String content,
            Pageable pageable
    );

    @Query("SELECT h FROM House h ORDER BY h.favoriteCount DESC LIMIT 3")
    List<House> findTop3FavoritesHouses();

    @Query("SELECT new com.boomhouse.boomhouse.responsemodels.AllHousesAddressResponse(h.id, h.address) FROM House h")
    List<AllHousesAddressResponse> findAllHousesAddressWithoutPage();

    @Query("SELECT h FROM House h WHERE userEmail = :user_email")
    List<House> findHousesByUserEmail(@Param("user_email") String userEmail);
}
