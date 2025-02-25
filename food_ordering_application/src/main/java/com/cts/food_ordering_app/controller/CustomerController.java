package com.cts.food_ordering_app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.food_ordering_app.dto.CartDTO;
import com.cts.food_ordering_app.dto.FoodItemDTO;
import com.cts.food_ordering_app.dto.OrderDTO;
import com.cts.food_ordering_app.dto.PlaceOrderDTO;
import com.cts.food_ordering_app.service.customer.CustomerService;


@RestController
@RequestMapping("/api/customer")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/foodItems")
	public ResponseEntity<List<FoodItemDTO>> getAllFoodItems(){
		List<FoodItemDTO> foodItemDtoList = customerService.getAllFoodItems();
		return ResponseEntity.ok(foodItemDtoList);
	}
	
	@GetMapping("/foodItem/search/{name}")
	public ResponseEntity<List<FoodItemDTO>> searchFoodItemByName(@PathVariable String name){
		List<FoodItemDTO> foodItemDtoList = customerService.searchFoodItemByName(name);
		return ResponseEntity.ok(foodItemDtoList);
	}
	
	@PostMapping("/cart")
	public ResponseEntity<?> postFoodItemToCart(@RequestBody CartDTO cartDTO) {
	    System.out.println("Received CartDTO: " + cartDTO);
	    
	    if (cartDTO.getUserId() == null || cartDTO.getFoodItemId() == null) {
	        return ResponseEntity.badRequest().body("userId and foodItemId are required");
	    }
	    return customerService.addFoodItemToCart(cartDTO);
	}
	
	
	@GetMapping("/cart/{userId}")
	public ResponseEntity<OrderDTO> getCartByUserId(@PathVariable Long userId){
		OrderDTO orderDTO = customerService.getCartByUserId(userId);
		if(orderDTO == null)
			{
			return ResponseEntity.notFound().build();
			}
		return ResponseEntity.ok(orderDTO);
	}
	@GetMapping("/cart/{userId}/deduct/{foodItemId}")
	public ResponseEntity<OrderDTO> addMinusOnFoodItem(@PathVariable Long userId, @PathVariable Long foodItemId){
		OrderDTO orderDTO = customerService.addMinusFoodItem(userId, foodItemId);
		return ResponseEntity.ok(orderDTO);
	}
	
	@GetMapping("/cart/{userId}/add/{foodItemId}")
	public ResponseEntity<OrderDTO> addPlusOnFoodItem(@PathVariable Long userId, @PathVariable Long foodItemId){
		OrderDTO orderDTO = customerService.addPlusFoodItem(userId, foodItemId);
		return ResponseEntity.ok(orderDTO);
	}
	@PostMapping("/placeOrder")
	public ResponseEntity<OrderDTO> placeOrder(@RequestBody PlaceOrderDTO placeOrderDTO){
		System.out.println("Received PlaceOrderDTO: "+ placeOrderDTO);
		OrderDTO orderDTO = customerService.placeOrder(placeOrderDTO);
		if(orderDTO == null)
			{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		return ResponseEntity.status(HttpStatus.CREATED).body(orderDTO);
	}
	@GetMapping("/orders/{userId}")
	public ResponseEntity<List<OrderDTO>> getOrderByUserId(@PathVariable Long userId){
		List<OrderDTO> orderDTOList = customerService.getOrdersByUserId(userId);
		return ResponseEntity.ok(orderDTOList);
	}
	
	@DeleteMapping("/cart/{userId}/remove/{foodItemId}")
	public ResponseEntity<Void> removeFoodItemFromCart(@PathVariable Long userId, @PathVariable Long foodItemId) {
	    customerService.removeFoodItemFromCart(userId, foodItemId);
	    return ResponseEntity.noContent().build();
	}
}
