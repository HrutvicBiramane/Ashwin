package com.freshcart.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * CartItem Entity representing items in a user's shopping cart
 * 
 * Features:
 * - Quantity management
 * - Price calculation at time of addition
 * - Session persistence
 * - Product availability checking
 * 
 * @author FreshCart Development Team
 */
@Entity
@Table(name = "cart_items",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"user_id", "product_id"})
       },
       indexes = {
           @Index(name = "idx_cart_user", columnList = "user_id"),
           @Index(name = "idx_cart_product", columnList = "product_id")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true, exclude = {"user", "product"})
@ToString(exclude = {"user", "product"})
public class CartItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Max(value = 100, message = "Quantity cannot exceed 100")
    @Column(nullable = false)
    private Integer quantity;

    @NotNull(message = "Unit price is required")
    @DecimalMin(value = "0.01", message = "Unit price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Unit price must have at most 8 integer digits and 2 decimal places")
    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_cart_item_user"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "fk_cart_item_product"))
    private Product product;

    // Utility methods
    public BigDecimal getTotalPrice() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    public void updateQuantity(Integer newQuantity) {
        if (newQuantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        this.quantity = newQuantity;
    }

    public void incrementQuantity() {
        this.quantity++;
    }

    public void decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    public boolean isProductAvailable() {
        return product != null && product.isInStock() && product.getStockQuantity() >= quantity;
    }

    public void updatePriceFromProduct() {
        if (product != null) {
            this.unitPrice = product.getPrice();
        }
    }
}