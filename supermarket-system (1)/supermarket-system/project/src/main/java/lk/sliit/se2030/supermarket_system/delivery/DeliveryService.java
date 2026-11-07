package lk.sliit.se2030.supermarket_system.delivery;

import lk.sliit.se2030.supermarket_system.common.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    // ----- Create -----
    public Delivery assignDelivery(Delivery delivery) {
        delivery.setStatus("PACKED");
        return deliveryRepository.save(delivery);
    }

    // ----- Read -----
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public Delivery getDeliveryById(Long id) {
        return deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery", id));
    }

    public List<Delivery> getDeliveriesByStaff(Long staffId) {
        return deliveryRepository.findByDeliveryStaffId(staffId);
    }

    public List<Delivery> getDeliveriesByStatus(String status) {
        return deliveryRepository.findByStatusIgnoreCase(status);
    }

    // ----- Update -----
    public Delivery updateStatus(Long deliveryId, String status) {
        Delivery delivery = getDeliveryById(deliveryId);
        delivery.setStatus(status);
        return deliveryRepository.save(delivery);
    }

    // ----- Delete -----
    public void deleteDelivery(Long id) {
        Delivery delivery = getDeliveryById(id);
        deliveryRepository.delete(delivery);
    }
}
