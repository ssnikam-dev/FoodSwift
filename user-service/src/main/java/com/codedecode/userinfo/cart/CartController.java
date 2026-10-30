package com.codedecode.user.cart;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * GET /cart  -> the logged-in user's saved cart ({restaurant, items}), or {"restaurant":null,"items":[]}
 * PUT /cart  -> replace it
 * The user id always comes from the JWT (Authentication principal) - never from the request body.
 */
@RestController
@RequestMapping("/cart")
public class CartController {

    private static final String EMPTY = "{\"restaurant\":null,\"items\":[]}";
    private final CartRepository repo;

    public CartController(CartRepository repo) { this.repo = repo; }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> get(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(repo.findById(userId).map(Cart::getJson).orElse(EMPTY));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> put(Authentication auth, @RequestBody JsonNode body) {
        Long userId = (Long) auth.getPrincipal();
        Cart c = repo.findById(userId).orElseGet(() -> { Cart n = new Cart(); n.setUserId(userId); return n; });
        c.setJson(body.toString());
        repo.save(c);
        return ResponseEntity.noContent().build();
    }
}
