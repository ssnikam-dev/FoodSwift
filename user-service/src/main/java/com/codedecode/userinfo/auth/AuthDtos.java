package com.codedecode.userinfo.auth;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class AuthDtos {

    @Data @NoArgsConstructor
    public static class RegisterRequest {
        @NotBlank @Size(min = 2, max = 80) private String name;
        @NotBlank @Email private String email;
        @NotBlank @Size(min = 8, max = 100) private String password;
    }

    @Data @NoArgsConstructor
    public static class LoginRequest {
        @NotBlank @Email private String email;
        @NotBlank private String password;
    }

    /** Safe view of a user (no password hash). Matches the Angular `AppUser` interface. */
    @Data @AllArgsConstructor
    public static class UserView {
        private Long id;
        private String name;
        private String email;
        private String role;
    }

    /** Matches the Angular `AuthResponse` interface. */
    @Data @AllArgsConstructor
    public static class AuthResponse {
        private String token;
        private UserView user;
    }
}
