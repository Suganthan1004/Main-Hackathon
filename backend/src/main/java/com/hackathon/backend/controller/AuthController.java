package com.hackathon.backend.controller;


import com.hackathon.backend.dto.LoginRequest;
import com.hackathon.backend.dto.RegisterRequest;
import com.hackathon.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody RegisterRequest request) {
        String message = authService.register(request);
        return Map.of("message", message);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        String token = authService.login(request);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", "USER");

        return response;
    }
}