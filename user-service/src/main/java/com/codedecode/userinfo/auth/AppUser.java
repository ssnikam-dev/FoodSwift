package com.codedecode.user.auth;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/** If your user service already has a AppUser entity, add the `email`, `passwordHash` and `role` fields to it instead. */
@Entity
@Table(name = "app_user", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Data
@NoArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;      // BCrypt hash, never the raw password

    @Column(nullable = false)
    private String role = "USER";     // USER | ADMIN
}
