package lk.sliit.se2030.supermarket_system.order;

import lk.sliit.se2030.supermarket_system.common.ResourceNotFoundException;
import lk.sliit.se2030.supermarket_system.order.strategy.PaymentStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/** Context of the Strategy pattern: picks a PaymentStrategy by method name. */
@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    private final Map<String, PaymentStrategy> strategies;

    // Spring injects every PaymentStrategy bean; adding a new one needs no change here (Open/Closed)
    public PaymentService(List<PaymentStrategy> strategyList) {
        this.strategies = strategyList.stream()
                .collect(Collectors.toMap(PaymentStrategy::getMethod, Function.identity()));
    }

    // ----- Create -----
    public Payment processPayment(Payment payment) {
        PaymentStrategy strategy = strategies.get(payment.getMethod());
        if (strategy == null) {
            throw new IllegalArgumentException("Unsupported payment method: " + payment.getMethod());
        }
        strategy.process(payment);
        payment.setPaymentDate(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    // ----- Read -----
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment", id));
    }

    public List<Payment> getPaymentsByOrder(Long orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    // ----- Update -----
    public Payment updatePaymentStatus(Long id, String status) {
        Payment payment = getPaymentById(id);
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    // ----- Delete -----
    public void deletePayment(Long id) {
        Payment payment = getPaymentById(id);
        paymentRepository.delete(payment);
    }
}