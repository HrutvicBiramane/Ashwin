package com.freshcart.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * Review Entity representing product reviews and ratings
 * 
 * Features:
 * - Star rating system (1-5 stars)
 * - Review text with validation
 * - Review status management
 * - Verified purchase validation
 * - Helpful votes tracking
 * 
 * @author FreshCart Development Team
 */
@Entity
@Table(name = "reviews",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"user_id", "product_id"})
       },
       indexes = {
           @Index(name = "idx_review_user", columnList = "user_id"),
           @Index(name = "idx_review_product", columnList = "product_id"),
           @Index(name = "idx_review_rating", columnList = "rating"),
           @Index(name = "idx_review_status", columnList = "status")
       })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true, exclude = {"user", "product"})
@ToString(exclude = {"user", "product"})
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Rating is required")
    @DecimalMin(value = "1.0", message = "Rating must be at least 1.0")
    @DecimalMax(value = "5.0", message = "Rating must not exceed 5.0")
    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal rating;

    @Size(max = 100, message = "Title must not exceed 100 characters")
    @Column(length = 100)
    private String title;

    @Size(max = 2000, message = "Comment must not exceed 2000 characters")
    @Column(length = 2000)
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private ReviewStatus status = ReviewStatus.PENDING;

    @Builder.Default
    @Column(name = "verified_purchase", nullable = false)
    private Boolean verifiedPurchase = false;

    @Min(value = 0, message = "Helpful votes must be non-negative")
    @Column(name = "helpful_votes", nullable = false)
    @Builder.Default
    private Integer helpfulVotes = 0;

    @Min(value = 0, message = "Not helpful votes must be non-negative")
    @Column(name = "not_helpful_votes", nullable = false)
    @Builder.Default
    private Integer notHelpfulVotes = 0;

    @Size(max = 500, message = "Admin notes must not exceed 500 characters")
    @Column(name = "admin_notes", length = 500)
    private String adminNotes;

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_review_user"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "fk_review_product"))
    private Product product;

    // Utility methods
    public void approve() {
        this.status = ReviewStatus.APPROVED;
    }

    public void reject(String reason) {
        this.status = ReviewStatus.REJECTED;
        this.adminNotes = reason;
    }

    public void markAsSpam() {
        this.status = ReviewStatus.SPAM;
    }

    public boolean isApproved() {
        return status == ReviewStatus.APPROVED;
    }

    public boolean isPending() {
        return status == ReviewStatus.PENDING;
    }

    public boolean isRejected() {
        return status == ReviewStatus.REJECTED;
    }

    public void incrementHelpfulVotes() {
        this.helpfulVotes++;
    }

    public void incrementNotHelpfulVotes() {
        this.notHelpfulVotes++;
    }

    public int getTotalVotes() {
        return helpfulVotes + notHelpfulVotes;
    }

    public double getHelpfulnessRatio() {
        int total = getTotalVotes();
        if (total == 0) {
            return 0.0;
        }
        return (double) helpfulVotes / total;
    }

    public String getDisplayName() {
        if (user != null) {
            return user.getFirstName() + " " + user.getLastName().charAt(0) + ".";
        }
        return "Anonymous";
    }

    public boolean canBeModified() {
        return status == ReviewStatus.PENDING;
    }

    // Enums
    public enum ReviewStatus {
        PENDING, APPROVED, REJECTED, SPAM
    }
}