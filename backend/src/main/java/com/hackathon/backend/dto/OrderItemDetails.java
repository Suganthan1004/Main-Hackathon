package com.hackathon.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDetails {
    private String name;
    private Integer quantity;
    private Double price;
}