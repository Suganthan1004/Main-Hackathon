package com.hackathon.backend.controller;

import com.hackathon.backend.dto.OrderDetailsResponse;
import com.hackathon.backend.dto.OrderRequest;
import com.hackathon.backend.dto.OrderResponse;
import com.hackathon.backend.entity.OrderEntity;
import com.hackathon.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderEntity>> getOrdersForUser() {
        List<OrderEntity> orders = orderService.getOrdersForUser();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailsResponse> getOrderDetails(@PathVariable Long orderId) {
        OrderDetailsResponse response = orderService.getOrderDetails(orderId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
        String message = orderService.cancelOrder(orderId);
        return ResponseEntity.ok(message);
    }
}