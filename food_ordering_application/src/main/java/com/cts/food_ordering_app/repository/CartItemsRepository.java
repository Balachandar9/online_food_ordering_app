package com.cts.food_ordering_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.food_ordering_app.entities.CartItems;

@Repository
public interface CartItemsRepository extends JpaRepository<CartItems,Long> {

	Optional<CartItems> findByUserIdAndFoodItemIdAndOrderId(Long userId, Long foodItemId, Long orderId);

}
