package com.freshcart.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * OrderItem Entity representing individual items within an order
 * 
 * Features:
 * - Immutable order line items
 * - Price preservation at time of order
 * - Product snapshot data
 * - Quantity and pricing calculations
 * 
 * @author FreshCart Development Team
 */
@Entity
@Table(name = "order_items",
       indexes = {
           @Index(name = "idx_order_item_order", columnList = "order_id"),
           @Index(name = "idx_order_item_product", columnList = "product_id")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true, exclude = {"order", "product"})
@ToString(exclude = {"order", "product"})
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private Integer quantity;

    @NotNull(message = "Unit price is required")
    @DecimalMin(value = "0.01", message = "Unit price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Unit price must have at most 8 integer digits and 2 decimal places")
    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @NotNull(message = "Total price is required")
    @DecimalMin(value = "0.01", message = "Total price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Total price must have at most 8 integer digits and 2 decimal places")
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    // Product snapshot data (preserved at time of order)
    @NotBlank(message = "Product name is required")
    @Size(max = 200, message = "Product name must not exceed 200 characters")
    @Column(name = "product_name", nullable = false, length = 200)
    private String productName;

    @Size(max = 50, message = "Product SKU must not exceed 50 characters")
    @Column(name = "product_sku", length = 50)
    private String productSku;

    @Size(max = 255, message = "Product image URL must not exceed 255 characters")
    @Column(name = "product_image_url")
    private String productImageUrl;

    @Size(max = 50, message = "Unit must not exceed 50 characters")
    @Column(length = 50)
    private String unit;

    @DecimalMin(value = "0.00", message = "Weight must be non-negative")
    @Digits(integer = 5, fraction = 3, message = "Weight must have at most 5 integer digits and 3 decimal places")
    @Column(precision = 8, scale = 3)
    private BigDecimal weight;

    @Size(max = 50, message = "Weight unit must not exceed 50 characters")
    @Column(name = "weight_unit", length = 50)
    private String weightUnit;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, foreignKey = @ForeignKey(name = "fk_order_item_order"))
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "fk_order_item_product"))
    private Product product;

    // Utility methods
    public void calculateTotalPrice() {
        this.totalPrice = unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    public BigDecimal getTotalPrice() {
        if (totalPrice == null) {
            calculateTotalPrice();
        }
        return totalPrice;
    }

    public void updateFromProduct() {
        if (product != null) {
            this.productName = product.getName();
            this.productSku = product.getSku();
            this.productImageUrl = product.getPrimaryImageUrl();
            this.unit = product.getUnit();
            this.weight = product.getWeight();
            this.weightUnit = product.getWeightUnit();
            this.unitPrice = product.getPrice();
            calculateTotalPrice();
        }
    }

    @PrePersist
    @PreUpdate
    private void ensureTotalPriceCalculated() {
        if (totalPrice == null || totalPrice.compareTo(BigDecimal.ZERO) == 0) {
            calculateTotalPrice();
        }
    }
}