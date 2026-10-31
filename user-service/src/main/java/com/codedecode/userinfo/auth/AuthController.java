package com.codedecode.user.auth;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.codedecode.user.auth.AuthDtos.*;
import com.codedecode.user.security.JwtService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req) {
        if (users.existsByEmailIgnoreCase(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");   // -> 409
        }
        User u = new User();
        u.setName(req.getName().trim());
        u.setEmail(req.getEmail().trim().toLowerCase());
        u.setPasswordHash(encoder.encode(req.getPassword()));
        u.setRole("USER");                       // never trust a role sent by the client
        u = users.save(u);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(u));
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        User u = users.findByEmailIgnoreCase(req.getEmail())
                .filter(x -> encoder.matches(req.getPassword(), x.getPasswordHash()))
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));          // -> 401
        return toResponse(u);
    }

    private AuthResponse toResponse(User u) {
        String token = jwt.generate(u.getId(), u.getEmail(), u.getRole());
        return new AuthResponse(token, new UserView(u.getId(), u.getName(), u.getEmail(), u.getRole()));
    }
}
