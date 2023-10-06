package com.boomhouse.boomhouse.rest;

import com.boomhouse.boomhouse.entity.Review;
import com.boomhouse.boomhouse.service.ReviewService;
import com.boomhouse.boomhouse.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin(origins = {"https://boom-house.vercel.app", "http://127.0.0.1:5173"})
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/find")
    public Page<Review> findReviewsByHouseId(
            @RequestParam String houseId,
            @RequestParam String page,
            @RequestParam String size
    ) {
        Page<Review> theReviews = reviewService.findReviewsByHouseId(houseId, page, size);

        return theReviews;
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token, @RequestBody Review review) throws Exception {
        String userEmail = ExtractJWT.getUserInfo(token, "email");

        if(userEmail == null) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        // post review
        reviewService.postReview(review);
    }

    @DeleteMapping("/secure")
    public void deleteReview(@RequestHeader(value = "Authorization") String token, @RequestParam UUID reviewId) throws Exception {
        String userEmail = ExtractJWT.getUserInfo(token, "email");

        if(userEmail == null) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        // delete review
        reviewService.deleteReview(reviewId);
    }
}
