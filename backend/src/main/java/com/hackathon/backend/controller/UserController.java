package com.hackathon.backend.controller;

import com.hackathon.backend.dto.UserUpdateRequest;
import com.hackathon.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UserUpdateRequest request) {
        String message = userService.updateUser(request);
        return ResponseEntity.ok(message);
    }
}