package com.codedecode.user.cart;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/** One row per user. The whole cart (restaurant + items) is stored as the JSON the Angular app sends. */
@Entity
@Table(name = "user_cart")
@Data
@NoArgsConstructor
public class Cart {
    @Id
    private Long userId;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String json;
}
