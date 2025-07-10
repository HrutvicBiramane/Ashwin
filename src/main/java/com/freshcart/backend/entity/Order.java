package com.freshcart.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Order Entity representing customer orders
 * 
 * Features:
 * - Comprehensive order tracking
 * - Multiple payment methods support
 * - Order status workflow
 * - Billing and shipping address management
 * - Tax and discount calculations
 * - Order item management
 * 
 * @author FreshCart Development Team
 */
@Entity
@Table(name = "orders",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "order_number")
       },
       indexes = {
           @Index(name = "idx_order_number", columnList = "order_number"),
           @Index(name = "idx_order_status", columnList = "status"),
           @Index(name = "idx_order_user", columnList = "user_id"),
           @Index(name = "idx_order_date", columnList = "order_date")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true, exclude = {"user", "orderItems"})
@ToString(exclude = {"user", "orderItems"})
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Order number is required")
    @Size(min = 8, max = 50, message = "Order number must be between 8 and 50 characters")
    @Column(name = "order_number", nullable = false, unique = true, length = 50)
    private String orderNumber;

    @NotNull(message = "Order date is required")
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING;

    @NotNull(message = "Subtotal is required")
    @DecimalMin(value = "0.00", message = "Subtotal must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Subtotal must have at most 8 integer digits and 2 decimal places")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @NotNull(message = "Tax amount is required")
    @DecimalMin(value = "0.00", message = "Tax amount must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Tax amount must have at most 8 integer digits and 2 decimal places")
    @Column(name = "tax_amount", nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @NotNull(message = "Shipping cost is required")
    @DecimalMin(value = "0.00", message = "Shipping cost must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Shipping cost must have at most 8 integer digits and 2 decimal places")
    @Column(name = "shipping_cost", nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal shippingCost = BigDecimal.ZERO;

    @DecimalMin(value = "0.00", message = "Discount amount must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Discount amount must have at most 8 integer digits and 2 decimal places")
    @Column(name = "discount_amount", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @NotNull(message = "Total amount is required")
    @DecimalMin(value = "0.01", message = "Total amount must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Total amount must have at most 8 integer digits and 2 decimal places")
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Size(max = 50, message = "Currency must not exceed 50 characters")
    @Column(length = 50)
    @Builder.Default
    private String currency = "USD";

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 30)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, length = 30)
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Size(max = 255, message = "Payment reference must not exceed 255 characters")
    @Column(name = "payment_reference")
    private String paymentReference;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    // Billing address
    @Size(max = 255, message = "Billing address line 1 must not exceed 255 characters")
    @Column(name = "billing_address_line_1")
    private String billingAddressLine1;

    @Size(max = 255, message = "Billing address line 2 must not exceed 255 characters")
    @Column(name = "billing_address_line_2")
    private String billingAddressLine2;

    @Size(max = 100, message = "Billing city must not exceed 100 characters")
    @Column(name = "billing_city")
    private String billingCity;

    @Size(max = 100, message = "Billing state must not exceed 100 characters")
    @Column(name = "billing_state")
    private String billingState;

    @Size(max = 20, message = "Billing postal code must not exceed 20 characters")
    @Column(name = "billing_postal_code")
    private String billingPostalCode;

    @Size(max = 100, message = "Billing country must not exceed 100 characters")
    @Column(name = "billing_country")
    private String billingCountry;

    // Shipping address
    @Size(max = 255, message = "Shipping address line 1 must not exceed 255 characters")
    @Column(name = "shipping_address_line_1")
    private String shippingAddressLine1;

    @Size(max = 255, message = "Shipping address line 2 must not exceed 255 characters")
    @Column(name = "shipping_address_line_2")
    private String shippingAddressLine2;

    @Size(max = 100, message = "Shipping city must not exceed 100 characters")
    @Column(name = "shipping_city")
    private String shippingCity;

    @Size(max = 100, message = "Shipping state must not exceed 100 characters")
    @Column(name = "shipping_state")
    private String shippingState;

    @Size(max = 20, message = "Shipping postal code must not exceed 20 characters")
    @Column(name = "shipping_postal_code")
    private String shippingPostalCode;

    @Size(max = 100, message = "Shipping country must not exceed 100 characters")
    @Column(name = "shipping_country")
    private String shippingCountry;

    @Size(max = 1000, message = "Notes must not exceed 1000 characters")
    @Column(length = 1000)
    private String notes;

    @Size(max = 100, message = "Tracking number must not exceed 100 characters")
    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "shipped_date")
    private LocalDateTime shippedDate;

    @Column(name = "delivered_date")
    private LocalDateTime deliveredDate;

    @Column(name = "expected_delivery_date")
    private LocalDateTime expectedDeliveryDate;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_order_user"))
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<OrderItem> orderItems = new HashSet<>();

    // Utility methods
    public void calculateTotals() {
        this.subtotal = orderItems.stream()
                .map(OrderItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        this.totalAmount = subtotal
                .add(taxAmount)
                .add(shippingCost)
                .subtract(discountAmount);
    }

    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
        calculateTotals();
    }

    public void removeOrderItem(OrderItem orderItem) {
        orderItems.remove(orderItem);
        orderItem.setOrder(null);
        calculateTotals();
    }

    public boolean canBeCancelled() {
        return status == OrderStatus.PENDING || status == OrderStatus.CONFIRMED;
    }

    public boolean canBeShipped() {
        return status == OrderStatus.CONFIRMED && paymentStatus == PaymentStatus.PAID;
    }

    public boolean isDelivered() {
        return status == OrderStatus.DELIVERED;
    }

    public String getFullBillingAddress() {
        StringBuilder address = new StringBuilder();
        if (billingAddressLine1 != null) address.append(billingAddressLine1);
        if (billingAddressLine2 != null) address.append(", ").append(billingAddressLine2);
        if (billingCity != null) address.append(", ").append(billingCity);
        if (billingState != null) address.append(", ").append(billingState);
        if (billingPostalCode != null) address.append(" ").append(billingPostalCode);
        if (billingCountry != null) address.append(", ").append(billingCountry);
        return address.toString();
    }

    public String getFullShippingAddress() {
        StringBuilder address = new StringBuilder();
        if (shippingAddressLine1 != null) address.append(shippingAddressLine1);
        if (shippingAddressLine2 != null) address.append(", ").append(shippingAddressLine2);
        if (shippingCity != null) address.append(", ").append(shippingCity);
        if (shippingState != null) address.append(", ").append(shippingState);
        if (shippingPostalCode != null) address.append(" ").append(shippingPostalCode);
        if (shippingCountry != null) address.append(", ").append(shippingCountry);
        return address.toString();
    }

    // Enums
    public enum OrderStatus {
        PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED
    }

    public enum PaymentMethod {
        CREDIT_CARD, DEBIT_CARD, PAYPAL, STRIPE, BANK_TRANSFER, CASH_ON_DELIVERY
    }

    public enum PaymentStatus {
        PENDING, PAID, FAILED, CANCELLED, REFUNDED, PARTIALLY_REFUNDED
    }
}