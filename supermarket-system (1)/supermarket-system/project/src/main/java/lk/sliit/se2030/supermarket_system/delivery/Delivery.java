package lk.sliit.se2030.supermarket_system.delivery;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "deliveries")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "orderId is required")
    private Long orderId;

    private Long deliveryStaffId;
    private String status; // PACKED, OUT_FOR_DELIVERY, DELIVERED
    private String address;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Long getDeliveryStaffId() { return deliveryStaffId; }
    public void setDeliveryStaffId(Long deliveryStaffId) { this.deliveryStaffId = deliveryStaffId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
