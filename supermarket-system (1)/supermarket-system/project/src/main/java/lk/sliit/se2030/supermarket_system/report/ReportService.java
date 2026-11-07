package lk.sliit.se2030.supermarket_system.report;

import lk.sliit.se2030.supermarket_system.common.ResourceNotFoundException;
import lk.sliit.se2030.supermarket_system.order.Payment;
import lk.sliit.se2030.supermarket_system.order.PaymentRepository;
import lk.sliit.se2030.supermarket_system.product.Product;
import lk.sliit.se2030.supermarket_system.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private static final int DEFAULT_THRESHOLD = 10;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StockAlertRepository stockAlertRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // ----- Create -----
    // Scans products; creates an alert for any low-stock product that doesn't already have one
    public List<StockAlert> scanAndCreateAlerts() {
        List<Product> lowStockProducts = productRepository.findAll().stream()
                .filter(p -> p.getStockQuantity() <= DEFAULT_THRESHOLD)
                .collect(Collectors.toList());

        for (Product product : lowStockProducts) {
            boolean alreadyAlerted = stockAlertRepository.findAll().stream()
                    .anyMatch(a -> a.getProductId().equals(product.getId()) && !a.isResolved());

            if (!alreadyAlerted) {
                StockAlert alert = new StockAlert();
                alert.setProductId(product.getId());
                alert.setCurrentStock(product.getStockQuantity());
                alert.setThreshold(DEFAULT_THRESHOLD);
                alert.setResolved(false);
                stockAlertRepository.save(alert);
            }
        }
        return getUnresolvedAlerts();
    }

    public StockAlert createAlert(StockAlert alert) {
        return stockAlertRepository.save(alert);
    }

    // ----- Read -----
    public List<StockAlert> getAllAlerts() {
        return stockAlertRepository.findAll();
    }

    public List<StockAlert> getUnresolvedAlerts() {
        return stockAlertRepository.findAll().stream()
                .filter(a -> !a.isResolved())
                .collect(Collectors.toList());
    }

    public StockAlert getAlertById(Long id) {
        return stockAlertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("StockAlert", id));
    }

    // Sales summary for Admin Dashboard, built from successful payments
    public Map<String, Object> getSalesSummary() {
        List<Payment> successfulPayments = paymentRepository.findAll().stream()
                .filter(p -> "SUCCESS".equals(p.getStatus()))
                .collect(Collectors.toList());

        double totalRevenue = successfulPayments.stream()
                .mapToDouble(Payment::getAmount)
                .sum();

        return Map.of(
                "totalOrdersPaid", successfulPayments.size(),
                "totalRevenue", totalRevenue
        );
    }

    // ----- Update ----- (mark an alert resolved once stock is replenished)
    public StockAlert updateAlert(Long id, StockAlert updated) {
        StockAlert existing = getAlertById(id);
        existing.setCurrentStock(updated.getCurrentStock());
        existing.setThreshold(updated.getThreshold());
        existing.setResolved(updated.isResolved());
        return stockAlertRepository.save(existing);
    }

    public StockAlert resolveAlert(Long id) {
        StockAlert existing = getAlertById(id);
        existing.setResolved(true);
        return stockAlertRepository.save(existing);
    }

    // ----- Delete -----
    public void deleteAlert(Long id) {
        StockAlert existing = getAlertById(id);
        stockAlertRepository.delete(existing);
    }
}
