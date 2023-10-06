package com.boomhouse.boomhouse.service;

import com.boomhouse.boomhouse.dao.FavoriteRepository;
import com.boomhouse.boomhouse.entity.Favorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class FavoriteService {

    private FavoriteRepository favoriteRepository;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public Favorite findFavorite(String houseId, String userEmail) {
        return favoriteRepository.findFavoriteByHouseIdAndEmail(houseId, userEmail);
    }

    public List<Favorite> findFavoritesByEmail(String userEmail) {
        return favoriteRepository.findFavoritesByEmail(userEmail);
    }

    public void addFavorite(Favorite favorite) {
        favoriteRepository.save(favorite);
    }

    public void removeFavorite(UUID favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }

    public void deleteFavoritesByHouseId(String houseId) {
        favoriteRepository.deleteFavoritesByHouseId(houseId);
    }
}
