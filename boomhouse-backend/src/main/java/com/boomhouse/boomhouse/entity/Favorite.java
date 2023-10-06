package com.boomhouse.boomhouse.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "favorite")
@Data
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "house_id", nullable = false)
    private String houseId;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    public Favorite() {
    }

    public Favorite(String houseId, String userEmail) {
        this.houseId = houseId;
        this.userEmail = userEmail;
    }

    @Override
    public String toString() {
        return "Favorite{" +
                "id=" + id +
                ", houseId='" + houseId + '\'' +
                ", userEmail='" + userEmail + '\'' +
                '}';
    }
}
