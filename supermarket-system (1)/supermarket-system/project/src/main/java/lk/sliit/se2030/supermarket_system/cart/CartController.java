package lk.sliit.se2030.supermarket_system.cart;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Shopping Cart Management — full CRUD on both the cart and its items (Customer function)
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // CREATE — an empty cart for a user
    @PostMapping("/user/{userId}")
    public ResponseEntity<Cart> createCart(@PathVariable Long userId) {
        Cart cart = cartService.createCartForUser(userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(cart);
    }

    // READ (all carts — admin)
    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(cartService.getAllCarts());
    }

    // READ (one cart, by its own id)
    @GetMapping("/{cartId}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long cartId) {
        return ResponseEntity.ok(cartService.getCartById(cartId));
    }

    // READ (a user's cart — auto-creates one if it doesn't exist yet)
    @GetMapping("/user/{userId}")
    public ResponseEntity<Cart> getCartByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    // DELETE (whole cart)
    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.noContent().build();
    }

    // ----- Cart item sub-resource -----

    // CREATE (add item to a user's cart)
    @PostMapping("/user/{userId}/item")
    public ResponseEntity<CartItem> addItem(@PathVariable Long userId, @Valid @RequestBody CartItem item) {
        CartItem saved = cartService.addItemToCart(userId, item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // READ (single item)
    @GetMapping("/item/{itemId}")
    public ResponseEntity<CartItem> getItem(@PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.getItemById(itemId));
    }

    // UPDATE (quantity)
    @PutMapping("/item/{itemId}")
    public ResponseEntity<CartItem> updateItem(@PathVariable Long itemId, @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItemQuantity(itemId, quantity));
    }

    // DELETE (single item)
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }
}
