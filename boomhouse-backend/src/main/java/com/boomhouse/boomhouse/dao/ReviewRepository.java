package com.boomhouse.boomhouse.dao;

import com.boomhouse.boomhouse.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {

    @Query("SELECT r from Review r WHERE houseId = :house_id")
    Page<Review> findReviewsByHouseId(
            @Param("house_id") String houseId,
            Pageable pageable
    );

    @Modifying
    @Transactional
    @Query("DELETE from Review r WHERE houseId = :house_id")
    void deleteReviewsByHouseId(@Param("house_id") String houseId);
}
