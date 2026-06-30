package com.jananijobs.backend.auth.service;

import com.jananijobs.backend.auth.dto.AuthResponse;
import com.jananijobs.backend.auth.dto.LoginRequest;
import com.jananijobs.backend.auth.dto.RegisterRequest;
import com.jananijobs.backend.auth.entity.Role;
import com.jananijobs.backend.auth.entity.User;
import com.jananijobs.backend.auth.repository.RoleRepository;
import com.jananijobs.backend.auth.repository.UserRepository;
import com.jananijobs.backend.security.JwtService;
import com.jananijobs.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Normalize the role string coming from the payload (e.g., "RECRUITER" -> "ROLE_RECRUITER")
        String requestedRole = request.getRole().toUpperCase();
        if (!requestedRole.startsWith("ROLE_")) {
            requestedRole = "ROLE_" + requestedRole;
        }

        Role userRole = roleRepository.findByName(requestedRole)
                .orElseThrow(() -> new RuntimeException("Role not found: " + request.getRole()));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .roles(Set.of(userRole)) // Assigns role to user account context instantly
                .enabled(true)           // Matches Lombok variable builder specification format
                .build();

        User savedUser = userRepository.save(user);

        CustomUserDetails userDetails = new CustomUserDetails(savedUser);
        String token = jwtService.generateToken(userDetails);

        return AuthResponse.builder()
                .accessToken(token)
                .email(savedUser.getEmail())
                .role(userRole.getName())
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtService.generateToken(userDetails);

        Role primaryRole = user.getRoles().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("User has no assigned roles"));

        return AuthResponse.builder()
                .accessToken(token)
                .email(user.getEmail())
                .role(primaryRole.getName())
                .build();
    }
}