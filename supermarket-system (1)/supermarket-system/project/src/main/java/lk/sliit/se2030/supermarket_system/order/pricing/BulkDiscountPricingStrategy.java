package lk.sliit.se2030.supermarket_system.order.pricing;

import org.springframework.stereotype.Component;

/** Concrete Strategy 2: 10% off when the basket is Rs. 5,000 or more. */
@Component
public class BulkDiscountPricingStrategy implements OrderPricingStrategy {
    private static final double THRESHOLD = 5000.0;
    private static final double DISCOUNT_RATE = 0.10;

    @Override
    public String getName() { return "BULK_DISCOUNT"; }

    @Override
    public boolean appliesTo(double subtotal) { return subtotal >= THRESHOLD; }

    @Override
    public double calculateTotal(double subtotal) {
        double total = subtotal * (1 - DISCOUNT_RATE);
        return Math.round(total * 100.0) / 100.0;
    }
}