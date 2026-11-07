package lk.sliit.se2030.supermarket_system.order;

import lk.sliit.se2030.supermarket_system.common.ResourceNotFoundException;
import lk.sliit.se2030.supermarket_system.order.pricing.OrderPricingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

/** Context of the Strategy pattern: applies the best OrderPricingStrategy to an order. */
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Spring injects every OrderPricingStrategy bean; adding a new rule needs no change here (Open/Closed)
    private final List<OrderPricingStrategy> pricingStrategies;

    public OrderService(List<OrderPricingStrategy> pricingStrategies) {
        this.pricingStrategies = pricingStrategies;
    }

    // ----- Create -----
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        // Link each OrderItem back to this Order so JPA cascade actually
        // saves them (without this, order_items stays empty).
        if (order.getItems() != null && !order.getItems().isEmpty()) {
            order.getItems().forEach(item -> item.setOrder(order));

            // Strategy pattern: total is calculated by the pricing rules, not trusted from the client
            double subtotal = order.getItems().stream()
                    .mapToDouble(i -> i.getPriceAtPurchase() * i.getQuantity())
                    .sum();
            order.setTotalAmount(applyPricing(subtotal));
        }

        return orderRepository.save(order);
    }

    // Customer gets the best deal among all applicable pricing strategies
    private double applyPricing(double subtotal) {
        return pricingStrategies.stream()
                .filter(strategy -> strategy.appliesTo(subtotal))
                .mapToDouble(strategy -> strategy.calculateTotal(subtotal))
                .min()
                .orElse(subtotal);
    }

    // ----- Read -----
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatusIgnoreCase(status);
    }

    // ----- Update -----
    public Order updateStatus(Long orderId, String status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // Full update — lets the customer edit delivery address before it's confirmed
    public Order updateOrder(Long orderId, Order updated) {
        Order existing = getOrderById(orderId);
        existing.setDeliveryAddress(updated.getDeliveryAddress());
        existing.setTotalAmount(updated.getTotalAmount());
        return orderRepository.save(existing);
    }

    // ----- Delete -----
    public void deleteOrder(Long orderId) {
        Order order = getOrderById(orderId);
        orderRepository.delete(order);
    }
}