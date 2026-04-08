package com.hackathon.backend.service;

import com.hackathon.backend.dto.UserUpdateRequest;
import com.hackathon.backend.entity.User;
import com.hackathon.backend.exception.ResourceNotFoundException;
import com.hackathon.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public String updateUser(UserUpdateRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication != null ? authentication.getName() : null;

        if (email == null || email.isBlank()) {
            throw new ResourceNotFoundException("Authenticated user not found");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getContact() != null) {
            user.setContact(request.getContact());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }

        userRepository.save(user);

        return "User details updated successfully";
    }
}