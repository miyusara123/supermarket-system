package lk.sliit.se2030.supermarket_system.order;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Payment Processing — full CRUD (Customer function: pay, view invoice history)
@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // CREATE
    @PostMapping
    public ResponseEntity<Payment> processPayment(@Valid @RequestBody Payment payment) {
        Payment saved = paymentService.processPayment(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // READ (all, optionally by order)
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments(@RequestParam(required = false) Long orderId) {
        if (orderId != null) {
            return ResponseEntity.ok(paymentService.getPaymentsByOrder(orderId));
        }
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    // READ (one)
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPayment(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    // UPDATE (status — e.g. refund a payment)
    @PutMapping("/{id}/status")
    public ResponseEntity<Payment> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(paymentService.updatePaymentStatus(id, status));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
