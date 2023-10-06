package com.boomhouse.boomhouse.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

@Entity
@Table(name = "house")
@Data
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "rating", nullable = false)
    private double rating;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "images", nullable = false, length = Integer.MAX_VALUE)
    @Lob
    private String[] images;

    @Column(name = "tags", nullable = false)
    private String[] tags;

    @Column(name = "house_type", nullable = false)
    private String houseType;

    @Column(name = "favorite_count", nullable=false)
    private int favoriteCount;

    @Column(name = "anonymous_posted", nullable = false)
    private Boolean anonymousPosted;

    @UpdateTimestamp
    @Column(name="update_time", nullable = false)
    private LocalDateTime updateTime;

    public House() {
    }

    public House(String title, String address, double rating, String description, String[] images, String[] tags,
                 String houseType, int favoriteCount, Boolean anonymousPosted
    ) {
        this.title = title;
        this.address = address;
        this.rating = rating;
        this.description = description;
        this.images = images;
        this.tags = tags;
        this.houseType = houseType;
        this.favoriteCount = favoriteCount;
        this.anonymousPosted = anonymousPosted;
    }

    @Override
    public String toString() {
        return "House{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", address='" + address + '\'' +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", images=" + Arrays.toString(images) +
                ", tags=" + Arrays.toString(tags) +
                ", houseType='" + houseType + '\'' +
                ", favoriteCount=" + favoriteCount +
                ", anonymousPosted=" + anonymousPosted +
                ", updateTime=" + updateTime +
                '}';
    }
}
