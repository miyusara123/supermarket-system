package lk.sliit.se2030.supermarket_system.order.strategy;

import lk.sliit.se2030.supermarket_system.order.Payment;
import org.springframework.stereotype.Component;

/** Concrete Strategy 2: pay when the order is delivered. */
@Component
public class CashOnDeliveryPaymentStrategy implements PaymentStrategy {
    @Override
    public String getMethod() { return "ON_DELIVERY"; }

    @Override
    public void process(Payment payment) {
        payment.setStatus("PENDING"); // collected by the delivery person later
    }
}