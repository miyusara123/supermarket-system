package lk.sliit.se2030.supermarket_system.cart;

import lk.sliit.se2030.supermarket_system.common.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    // ----- Cart CRUD -----

    // CREATE — makes an empty cart for a user (called once, e.g. right after registration/first login)
    public Cart createCartForUser(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart cart = new Cart();
            cart.setUserId(userId);
            return cartRepository.save(cart);
        });
    }

    // READ (all — admin use)
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    // READ (by cart id)
    public Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", cartId));
    }

    // READ (by user — auto-creates an empty cart the first time, so the frontend never gets a 404)
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> createCartForUser(userId));
    }

    // DELETE (clears the whole cart, e.g. after checkout or by an admin)
    public void deleteCart(Long cartId) {
        Cart cart = getCartById(cartId);
        cartRepository.delete(cart);
    }

    // ----- CartItem CRUD -----

    // CREATE — adds an item to a user's cart; increases quantity if it's already in there
    public CartItem addItemToCart(Long userId, CartItem item) {
        Cart cart = getCartByUserId(userId);

        return cart.getItems().stream()
                .filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst()
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + item.getQuantity());
                    return cartItemRepository.save(existing);
                })
                .orElseGet(() -> {
                    item.setCart(cart);
                    return cartItemRepository.save(item);
                });
    }

    // READ (single item)
    public CartItem getItemById(Long itemId) {
        return cartItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem", itemId));
    }

    // UPDATE (change quantity)
    public CartItem updateItemQuantity(Long itemId, int quantity) {
        CartItem item = getItemById(itemId);
        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    // DELETE (single item)
    public void removeItem(Long itemId) {
        CartItem item = getItemById(itemId);
        cartItemRepository.delete(item);
    }
}
