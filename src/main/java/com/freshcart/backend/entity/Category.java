package com.freshcart.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Category Entity representing product categories
 * 
 * Features:
 * - Hierarchical category structure (parent-child relationships)
 * - SEO-friendly slug generation
 * - Category status management
 * - Display order for sorting
 * 
 * @author FreshCart Development Team
 */
@Entity
@Table(name = "categories",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "name"),
           @UniqueConstraint(columnNames = "slug")
       },
       indexes = {
           @Index(name = "idx_category_slug", columnList = "slug"),
           @Index(name = "idx_category_status", columnList = "status"),
           @Index(name = "idx_category_display_order", columnList = "display_order")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true, exclude = {"products", "children", "parent"})
@ToString(exclude = {"products", "children", "parent"})
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 100, message = "Category name must be between 2 and 100 characters")
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @NotBlank(message = "Category slug is required")
    @Size(min = 2, max = 100, message = "Category slug must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", 
             message = "Slug must contain only lowercase letters, numbers, and hyphens")
    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(length = 500)
    private String description;

    @Size(max = 255, message = "Image URL must not exceed 255 characters")
    @Column(name = "image_url")
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private CategoryStatus status = CategoryStatus.ACTIVE;

    @Min(value = 0, message = "Display order must be non-negative")
    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @Builder.Default
    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured = false;

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

    // Hierarchical structure
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", foreignKey = @ForeignKey(name = "fk_category_parent"))
    private Category parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Category> children = new HashSet<>();

    // Products in this category
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Product> products = new HashSet<>();

    // Utility methods
    public boolean isParentCategory() {
        return parent == null;
    }

    public boolean isChildCategory() {
        return parent != null;
    }

    public boolean hasChildren() {
        return !children.isEmpty();
    }

    public boolean hasProducts() {
        return !products.isEmpty();
    }

    public String getFullPath() {
        if (parent == null) {
            return name;
        }
        return parent.getFullPath() + " > " + name;
    }

    public void addChild(Category child) {
        children.add(child);
        child.setParent(this);
    }

    public void removeChild(Category child) {
        children.remove(child);
        child.setParent(null);
    }

    public void addProduct(Product product) {
        products.add(product);
        product.setCategory(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setCategory(null);
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
    public enum CategoryStatus {
        ACTIVE, INACTIVE, ARCHIVED
    }
}