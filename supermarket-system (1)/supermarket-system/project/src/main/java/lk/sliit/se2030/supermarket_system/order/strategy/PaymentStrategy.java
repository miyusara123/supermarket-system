package lk.sliit.se2030.supermarket_system.order.strategy;

import lk.sliit.se2030.supermarket_system.order.Payment;

/** Strategy interface: every payment method implements this. */
public interface PaymentStrategy {
    String getMethod();          // e.g. "ONLINE", "ON_DELIVERY"
    void process(Payment payment); // sets the correct status for this method
}