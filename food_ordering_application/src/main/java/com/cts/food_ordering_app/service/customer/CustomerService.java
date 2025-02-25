package com.cts.food_ordering_app.service.customer;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.cts.food_ordering_app.dto.CartDTO;
import com.cts.food_ordering_app.dto.FoodItemDTO;
import com.cts.food_ordering_app.dto.OrderDTO;
import com.cts.food_ordering_app.dto.PlaceOrderDTO;

public interface CustomerService {
	
	List<FoodItemDTO> getAllFoodItems();
	
	List<FoodItemDTO> searchFoodItemByName(String name);
	
	ResponseEntity<?> addFoodItemToCart(CartDTO cartDTO);
	
	OrderDTO getCartByUserId(Long userId);

	OrderDTO addMinusFoodItem(Long userId, Long foodItemId);
	
	OrderDTO addPlusFoodItem(Long userId, Long foodItemId);
	
	OrderDTO placeOrder(PlaceOrderDTO placeOrderDTO);
	
	List<OrderDTO> getOrdersByUserId(Long userId);

	void removeFoodItemFromCart(Long userId, Long bookId);

}
