package com.hackathon.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailsResponse {
    private Long id;
    private Long userId;
    private Double totalAmount;
    private String status;
    private String address;
    private LocalDateTime createdAt;
    private List<OrderItemDetails> items;
}