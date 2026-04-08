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

    private Long orderId;
    private String status;
    private Double totalAmount;
    private String address;
    private List<OrderItemDetails> items;
}