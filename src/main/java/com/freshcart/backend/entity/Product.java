package com.freshcart.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * Product Entity representing grocery items in the system
 * 
 * Features:
 * - Comprehensive product information
 * - Inventory management
 * - Pricing with discount support
 * - Nutritional information
 * - Product ratings and reviews
 * - SEO optimization
 * - Multi-image support
 * 
 * @author FreshCart Development Team
 */
@Entity
@Table(name = "products",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "sku"),
           @UniqueConstraint(columnNames = "slug")
       },
       indexes = {
           @Index(name = "idx_product_sku", columnList = "sku"),
           @Index(name = "idx_product_slug", columnList = "slug"),
           @Index(name = "idx_product_status", columnList = "status"),
           @Index(name = "idx_product_category", columnList = "category_id"),
           @Index(name = "idx_product_price", columnList = "price"),
           @Index(name = "idx_product_featured", columnList = "is_featured")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true, exclude = {"category", "cartItems", "reviews", "orderItems"})
@ToString(exclude = {"category", "cartItems", "reviews", "orderItems"})
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 200, message = "Product name must be between 2 and 200 characters")
    @Column(nullable = false, length = 200)
    private String name;

    @NotBlank(message = "Product slug is required")
    @Size(min = 2, max = 200, message = "Product slug must be between 2 and 200 characters")
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", 
             message = "Slug must contain only lowercase letters, numbers, and hyphens")
    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @NotBlank(message = "SKU is required")
    @Size(min = 3, max = 50, message = "SKU must be between 3 and 50 characters")
    @Pattern(regexp = "^[A-Z0-9\\-_]+$", message = "SKU must contain only uppercase letters, numbers, hyphens, and underscores")
    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    @Size(max = 1000, message = "Short description must not exceed 1000 characters")
    @Column(name = "short_description", length = 1000)
    private String shortDescription;

    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    @Column(length = 5000)
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Price must have at most 8 integer digits and 2 decimal places")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @DecimalMin(value = "0.00", message = "Original price must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Original price must have at most 8 integer digits and 2 decimal places")
    @Column(name = "original_price", precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @DecimalMin(value = "0.00", message = "Cost price must be non-negative")
    @Digits(integer = 8, fraction = 2, message = "Cost price must have at most 8 integer digits and 2 decimal places")
    @Column(name = "cost_price", precision = 10, scale = 2)
    private BigDecimal costPrice;

    @Min(value = 0, message = "Stock quantity must be non-negative")
    @Column(name = "stock_quantity", nullable = false)
    @Builder.Default
    private Integer stockQuantity = 0;

    @Min(value = 0, message = "Minimum stock level must be non-negative")
    @Column(name = "min_stock_level", nullable = false)
    @Builder.Default
    private Integer minStockLevel = 0;

    @Min(value = 0, message = "Maximum order quantity must be non-negative")
    @Column(name = "max_order_quantity")
    private Integer maxOrderQuantity;

    @Size(max = 50, message = "Unit must not exceed 50 characters")
    @Column(length = 50)
    private String unit; // e.g., "kg", "lb", "piece", "dozen"

    @DecimalMin(value = "0.00", message = "Weight must be non-negative")
    @Digits(integer = 5, fraction = 3, message = "Weight must have at most 5 integer digits and 3 decimal places")
    @Column(precision = 8, scale = 3)
    private BigDecimal weight;

    @Size(max = 50, message = "Weight unit must not exceed 50 characters")
    @Column(name = "weight_unit", length = 50)
    private String weightUnit; // e.g., "kg", "g", "lb", "oz"

    @Size(max = 100, message = "Dimensions must not exceed 100 characters")
    @Column(length = 100)
    private String dimensions; // e.g., "10x15x20 cm"

    @Size(max = 100, message = "Brand must not exceed 100 characters")
    @Column(length = 100)
    private String brand;

    @Size(max = 100, message = "Manufacturer must not exceed 100 characters")
    @Column(length = 100)
    private String manufacturer;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "manufacturing_date")
    private LocalDate manufacturingDate;

    @Size(max = 255, message = "Primary image URL must not exceed 255 characters")
    @Column(name = "primary_image_url")
    private String primaryImageUrl;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    @Builder.Default
    private Set<String> imageUrls = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private ProductStatus status = ProductStatus.ACTIVE;

    @Builder.Default
    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured = false;

    @Builder.Default
    @Column(name = "is_organic", nullable = false)
    private Boolean isOrganic = false;

    @Builder.Default
    @Column(name = "is_vegetarian", nullable = false)
    private Boolean isVegetarian = false;

    @Builder.Default
    @Column(name = "is_vegan", nullable = false)
    private Boolean isVegan = false;

    @Builder.Default
    @Column(name = "is_gluten_free", nullable = false)
    private Boolean isGlutenFree = false;

    // Nutritional information
    @DecimalMin(value = "0.00", message = "Calories must be non-negative")
    @Column(precision = 8, scale = 2)
    private BigDecimal calories;

    @DecimalMin(value = "0.00", message = "Protein must be non-negative")
    @Digits(integer = 5, fraction = 2, message = "Protein must have at most 5 integer digits and 2 decimal places")
    @Column(precision = 7, scale = 2)
    private BigDecimal protein;

    @DecimalMin(value = "0.00", message = "Carbohydrates must be non-negative")
    @Digits(integer = 5, fraction = 2, message = "Carbohydrates must have at most 5 integer digits and 2 decimal places")
    @Column(precision = 7, scale = 2)
    private BigDecimal carbohydrates;

    @DecimalMin(value = "0.00", message = "Fat must be non-negative")
    @Digits(integer = 5, fraction = 2, message = "Fat must have at most 5 integer digits and 2 decimal places")
    @Column(precision = 7, scale = 2)
    private BigDecimal fat;

    @DecimalMin(value = "0.00", message = "Fiber must be non-negative")
    @Digits(integer = 5, fraction = 2, message = "Fiber must have at most 5 integer digits and 2 decimal places")
    @Column(precision = 7, scale = 2)
    private BigDecimal fiber;

    @DecimalMin(value = "0.00", message = "Sugar must be non-negative")
    @Digits(integer = 5, fraction = 2, message = "Sugar must have at most 5 integer digits and 2 decimal places")
    @Column(precision = 7, scale = 2)
    private BigDecimal sugar;

    @DecimalMin(value = "0.00", message = "Sodium must be non-negative")
    @Digits(integer = 7, fraction = 2, message = "Sodium must have at most 7 integer digits and 2 decimal places")
    @Column(precision = 9, scale = 2)
    private BigDecimal sodium; // in mg

    // Rating and review fields
    @DecimalMin(value = "0.0", message = "Average rating must be non-negative")
    @DecimalMax(value = "5.0", message = "Average rating must not exceed 5.0")
    @Column(name = "average_rating", precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal averageRating = BigDecimal.ZERO;

    @Min(value = 0, message = "Review count must be non-negative")
    @Column(name = "review_count", nullable = false)
    @Builder.Default
    private Integer reviewCount = 0;

    @Min(value = 0, message = "View count must be non-negative")
    @Column(name = "view_count", nullable = false)
    @Builder.Default
    private Integer viewCount = 0;

    @Min(value = 0, message = "Purchase count must be non-negative")
    @Column(name = "purchase_count", nullable = false)
    @Builder.Default
    private Integer purchaseCount = 0;

    // SEO fields
    @Size(max = 160, message = "Meta title must not exceed 160 characters")
    @Column(name = "meta_title")
    private String metaTitle;

    @Size(max = 320, message = "Meta description must not exceed 320 characters")
    @Column(name = "meta_description")
    private String metaDescription;

    @Size(max = 255, message = "Meta keywords must not exceed 255 characters")
    @Column(name = "meta_keywords")
    private String metaKeywords;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_product_category"))
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<CartItem> cartItems = new HashSet<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<OrderItem> orderItems = new HashSet<>();

    // Utility methods
    public boolean isInStock() {
        return stockQuantity > 0 && status == ProductStatus.ACTIVE;
    }

    public boolean isLowStock() {
        return stockQuantity <= minStockLevel;
    }

    public boolean isOnSale() {
        return originalPrice != null && originalPrice.compareTo(price) > 0;
    }

    public BigDecimal getDiscountAmount() {
        if (isOnSale()) {
            return originalPrice.subtract(price);
        }
        return BigDecimal.ZERO;
    }

    public BigDecimal getDiscountPercentage() {
        if (isOnSale()) {
            return getDiscountAmount()
                    .multiply(BigDecimal.valueOf(100))
                    .divide(originalPrice, 2, BigDecimal.ROUND_HALF_UP);
        }
        return BigDecimal.ZERO;
    }

    public void incrementViewCount() {
        this.viewCount++;
    }

    public void incrementPurchaseCount() {
        this.purchaseCount++;
    }

    public void updateRating(BigDecimal newRating, int newReviewCount) {
        this.averageRating = newRating;
        this.reviewCount = newReviewCount;
    }

    public void addImage(String imageUrl) {
        if (imageUrls == null) {
            imageUrls = new HashSet<>();
        }
        imageUrls.add(imageUrl);
        if (primaryImageUrl == null) {
            primaryImageUrl = imageUrl;
        }
    }

    public void removeImage(String imageUrl) {
        if (imageUrls != null) {
            imageUrls.remove(imageUrl);
            if (imageUrl.equals(primaryImageUrl)) {
                primaryImageUrl = imageUrls.isEmpty() ? null : imageUrls.iterator().next();
            }
        }
    }

    // Pre-persist method to generate slug if not provided
    @PrePersist
    @PreUpdate
    private void generateSlugIfEmpty() {
        if (slug == null || slug.trim().isEmpty()) {
            this.slug = generateSlugFromName();
        }
    }

    private String generateSlugFromName() {
        return name.toLowerCase()
                  .replaceAll("[^a-z0-9\\s-]", "")
                  .replaceAll("\\s+", "-")
                  .replaceAll("-+", "-")
                  .replaceAll("^-|-$", "");
    }

    // Enums
    public enum ProductStatus {
        ACTIVE, INACTIVE, OUT_OF_STOCK, DISCONTINUED, DRAFT
    }
}