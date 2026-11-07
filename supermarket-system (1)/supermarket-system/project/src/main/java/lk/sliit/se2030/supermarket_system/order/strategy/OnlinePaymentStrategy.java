package lk.sliit.se2030.supermarket_system.order.strategy;

import lk.sliit.se2030.supermarket_system.order.Payment;
import org.springframework.stereotype.Component;

/** Concrete Strategy 1: card / instant transfer (simulated gateway). */
@Component
public class OnlinePaymentStrategy implements PaymentStrategy {
    @Override
    public String getMethod() { return "ONLINE"; }

    @Override
    public void process(Payment payment) {
        payment.setStatus("SUCCESS"); // paid immediately
    }
}