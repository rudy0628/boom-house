package com.boomhouse.boomhouse.service;

import com.boomhouse.boomhouse.dao.ReviewRepository;
import com.boomhouse.boomhouse.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Page<Review> findReviewsByHouseId(String houseId, String page, String size) {
        Pageable thePageable = PageRequest.of(
                Integer.parseInt(page),
                Integer.parseInt(size)
        );

        return reviewRepository.findReviewsByHouseId(houseId, thePageable);
    }

    public void postReview(Review review) {
        reviewRepository.save(review);
    }

    public void deleteReview(UUID reviewId) {
        Optional<Review> theReview = reviewRepository.findById(reviewId);

        if(theReview.isPresent()) {
            theReview.get().setReview("");
            reviewRepository.save(theReview.get());
        }
    }

    public void deleteReviewsByHouseId(String houseId) {
        reviewRepository.deleteReviewsByHouseId(houseId);
    }
}
