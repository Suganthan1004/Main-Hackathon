package com.hackathon.backend.controller;

import com.hackathon.backend.entity.MenuItem;
import com.hackathon.backend.entity.Restaurant;
import com.hackathon.backend.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantService.getAllRestaurants();
        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/{restaurantId}/menu")
    public ResponseEntity<List<MenuItem>> getMenuByRestaurantId(@PathVariable Long restaurantId) {
        List<MenuItem> menuItems = restaurantService.getMenuByRestaurantId(restaurantId);
        return ResponseEntity.ok(menuItems);
    }
}