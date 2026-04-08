package com.hackathon.backend.service;

import com.hackathon.backend.entity.MenuItem;
import com.hackathon.backend.entity.Restaurant;
import com.hackathon.backend.exception.ResourceNotFoundException;
import com.hackathon.backend.repository.MenuItemRepository;
import com.hackathon.backend.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public List<MenuItem> getMenuByRestaurantId(Long restaurantId) {
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new ResourceNotFoundException("Restaurant not found: " + restaurantId);
        }
        return menuItemRepository.findByRestaurantId(restaurantId);
    }
}