package com.boomhouse.boomhouse.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "review")
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "house_id", nullable = false)
    private String houseId;

    @Column(name = "review", nullable = false)
    private String review;

    @Column(name = "floor", nullable = false)
    private String floor;

    @Column(name = "user", nullable = false)
    private String user;

    public Review() {
    }

    public Review(String houseId, String review, String floor, String user) {
        this.houseId = houseId;
        this.review = review;
        this.floor = floor;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", houseId=" + houseId +
                ", review='" + review + '\'' +
                ", floor='" + floor + '\'' +
                ", user='" + user + '\'' +
                '}';
    }
}
