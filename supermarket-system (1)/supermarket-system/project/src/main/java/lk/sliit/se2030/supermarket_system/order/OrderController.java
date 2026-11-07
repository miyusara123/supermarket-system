package lk.sliit.se2030.supermarket_system.order;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Order Management
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // CREATE
    @PostMapping
    public ResponseEntity<Order> createOrder(@Valid @RequestBody Order order) {
        Order saved = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // READ (all, with optional filters)
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String status) {
        if (userId != null) {
            return ResponseEntity.ok(orderService.getOrdersByUser(userId));
        }
        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(orderService.getOrdersByStatus(status));
        }
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // READ (one)
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    // UPDATE (status only — used by Admin/Delivery Staff)
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }

    // UPDATE (full order details — used by the Customer before confirmation)
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        return ResponseEntity.ok(orderService.updateOrder(id, order));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
