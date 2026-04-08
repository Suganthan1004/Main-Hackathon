package com.hackathon.backend.service;

import com.hackathon.backend.dto.UserUpdateRequest;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public String updateUser(UserUpdateRequest request) {
        // Since no user entity, just return success
        // In real app, would update user in DB
        return "User details updated successfully";
    }
}