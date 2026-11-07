package lk.sliit.se2030.supermarket_system.order.pricing;

/** Strategy interface: every pricing rule for an order implements this. */
public interface OrderPricingStrategy {
    String getName();                         // e.g. "NO_DISCOUNT", "BULK_DISCOUNT"
    boolean appliesTo(double subtotal);       // does this rule apply to this basket?
    double calculateTotal(double subtotal);   // final amount to pay under this rule
}