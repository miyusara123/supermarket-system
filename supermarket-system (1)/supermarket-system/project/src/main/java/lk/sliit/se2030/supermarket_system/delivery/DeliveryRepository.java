package lk.sliit.se2030.supermarket_system.delivery;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByDeliveryStaffId(Long deliveryStaffId);
    List<Delivery> findByStatusIgnoreCase(String status);
}
