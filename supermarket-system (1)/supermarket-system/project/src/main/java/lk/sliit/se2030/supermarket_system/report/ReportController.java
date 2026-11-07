package lk.sliit.se2030.supermarket_system.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// Admin Dashboard & Reporting — full CRUD on stock alerts, plus read-only sales summary (Store Manager function)
@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // CREATE (manual alert)
    @PostMapping("/stock-alerts")
    public ResponseEntity<StockAlert> createAlert(@RequestBody StockAlert alert) {
        StockAlert saved = reportService.createAlert(alert);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // CREATE (auto-scan products and generate alerts for anything low on stock)
    @PostMapping("/stock-alerts/scan")
    public ResponseEntity<List<StockAlert>> scanForLowStock() {
        return ResponseEntity.ok(reportService.scanAndCreateAlerts());
    }

    // READ (all alerts, or just unresolved ones)
    @GetMapping("/stock-alerts")
    public ResponseEntity<List<StockAlert>> getAlerts(@RequestParam(required = false) Boolean unresolved) {
        if (Boolean.TRUE.equals(unresolved)) {
            return ResponseEntity.ok(reportService.getUnresolvedAlerts());
        }
        return ResponseEntity.ok(reportService.getAllAlerts());
    }

    // READ (one)
    @GetMapping("/stock-alerts/{id}")
    public ResponseEntity<StockAlert> getAlert(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.getAlertById(id));
    }

    // UPDATE
    @PutMapping("/stock-alerts/{id}")
    public ResponseEntity<StockAlert> updateAlert(@PathVariable Long id, @RequestBody StockAlert alert) {
        return ResponseEntity.ok(reportService.updateAlert(id, alert));
    }

    // UPDATE (quick "mark resolved" action)
    @PutMapping("/stock-alerts/{id}/resolve")
    public ResponseEntity<StockAlert> resolveAlert(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.resolveAlert(id));
    }

    // DELETE
    @DeleteMapping("/stock-alerts/{id}")
    public ResponseEntity<Void> deleteAlert(@PathVariable Long id) {
        reportService.deleteAlert(id);
        return ResponseEntity.noContent().build();
    }

    // READ (sales summary — naturally read-only, it's a computed report)
    @GetMapping("/sales-summary")
    public ResponseEntity<Map<String, Object>> getSalesSummary() {
        return ResponseEntity.ok(reportService.getSalesSummary());
    }
}
