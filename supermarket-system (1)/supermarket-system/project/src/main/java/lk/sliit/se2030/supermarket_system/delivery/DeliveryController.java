package lk.sliit.se2030.supermarket_system.delivery;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Order Tracking & Delivery Management — full CRUD (Customer & Delivery Staff function)
@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    // CREATE
    @PostMapping
    public ResponseEntity<Delivery> assignDelivery(@Valid @RequestBody Delivery delivery) {
        Delivery saved = deliveryService.assignDelivery(delivery);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // READ (all, optional filters)
    @GetMapping
    public ResponseEntity<List<Delivery>> getAllDeliveries(
            @RequestParam(required = false) Long staffId,
            @RequestParam(required = false) String status) {
        if (staffId != null) {
            return ResponseEntity.ok(deliveryService.getDeliveriesByStaff(staffId));
        }
        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(deliveryService.getDeliveriesByStatus(status));
        }
        return ResponseEntity.ok(deliveryService.getAllDeliveries());
    }

    // READ (one)
    @GetMapping("/{id}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryService.getDeliveryById(id));
    }

    // UPDATE
    @PutMapping("/{id}/status")
    public ResponseEntity<Delivery> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(deliveryService.updateStatus(id, status));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable Long id) {
        deliveryService.deleteDelivery(id);
        return ResponseEntity.noContent().build();
    }
}
