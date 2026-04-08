package com.hackathon.backend.service;

import com.hackathon.backend.dto.*;
import com.hackathon.backend.entity.MenuItem;
import com.hackathon.backend.entity.OrderEntity;
import com.hackathon.backend.entity.OrderItem;
import com.hackathon.backend.exception.InvalidInputException;
import com.hackathon.backend.exception.ResourceNotFoundException;
import com.hackathon.backend.repository.MenuItemRepository;
import com.hackathon.backend.repository.OrderItemRepository;
import com.hackathon.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;

    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        Long userId = 1L; // hardcoded
        String address = request.getAddress() != null ? request.getAddress() : "Chennai";

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new InvalidInputException("Order must have at least one item");
        }

        double[] totalAmount = {0.0};
        List<OrderItem> orderItems = request.getItems().stream().map(itemReq -> {
            MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found: " + itemReq.getMenuItemId()));
            double itemTotal = menuItem.getPrice() * itemReq.getQuantity();
            totalAmount[0] += itemTotal;
            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setPrice(menuItem.getPrice());
            return orderItem;
        }).collect(Collectors.toList());

        OrderEntity order = new OrderEntity();
        order.setUserId(userId);
        order.setTotalAmount(totalAmount[0]);
        order.setStatus("PLACED");
        order.setAddress(address);
        order.setCreatedAt(LocalDateTime.now());

        OrderEntity savedOrder = orderRepository.save(order);

        for (OrderItem item : orderItems) {
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        return new OrderResponse(savedOrder.getId(), savedOrder.getStatus(), savedOrder.getTotalAmount());
    }

    public List<OrderEntity> getOrdersForUser() {
        Long userId = 1L; // hardcoded
        return orderRepository.findByUserId(userId);
    }

    public OrderDetailsResponse getOrderDetails(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));

        List<OrderItem> orderItems = orderItemRepository.findByOrderId(orderId);
        List<OrderItemDetails> items = orderItems.stream()
                .map(item -> new OrderItemDetails(item.getMenuItem().getName(), item.getQuantity(), item.getPrice()))
                .collect(Collectors.toList());

        return new OrderDetailsResponse(order.getId(), order.getUserId(), order.getTotalAmount(),
                order.getStatus(), order.getAddress(), order.getCreatedAt(), items);
    }

    @Transactional
    public String cancelOrder(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));

        if (!"PLACED".equals(order.getStatus())) {
            throw new InvalidInputException("Order cannot be cancelled");
        }

        order.setStatus("CANCELLED");
        orderRepository.save(order);

        return "Order cancelled successfully";
    }
}