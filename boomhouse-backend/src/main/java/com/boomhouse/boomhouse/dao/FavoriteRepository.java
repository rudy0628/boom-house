package com.boomhouse.boomhouse.dao;

import com.boomhouse.boomhouse.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {

    @Query("SELECT f FROM Favorite f WHERE houseId = :house_id AND userEmail = :user_email")
    Favorite findFavoriteByHouseIdAndEmail(
            @Param("house_id") String houseId,
            @Param("user_email") String userEmail);

    @Query("SELECT f FROM Favorite f WHERE userEmail = :user_email")
    List<Favorite> findFavoritesByEmail(@Param("user_email") String userEmail);

    @Modifying
    @Transactional
    @Query("DELETE FROM Favorite f WHERE houseId = :house_id")
    void deleteFavoritesByHouseId(@Param("house_id") String houseId);
}
