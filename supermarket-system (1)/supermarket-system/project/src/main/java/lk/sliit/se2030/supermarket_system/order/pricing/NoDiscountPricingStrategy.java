package lk.sliit.se2030.supermarket_system.order.pricing;

import org.springframework.stereotype.Component;

/** Concrete Strategy 1: default rule, customer pays the full subtotal. */
@Component
public class NoDiscountPricingStrategy implements OrderPricingStrategy {
    @Override
    public String getName() { return "NO_DISCOUNT"; }

    @Override
    public boolean appliesTo(double subtotal) { return true; } // always valid fallback

    @Override
    public double calculateTotal(double subtotal) { return subtotal; }
}