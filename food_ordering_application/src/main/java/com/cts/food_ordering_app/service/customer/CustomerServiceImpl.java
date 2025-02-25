package com.cts.food_ordering_app.service.customer;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cts.food_ordering_app.dto.CartDTO;
import com.cts.food_ordering_app.dto.FoodItemDTO;
import com.cts.food_ordering_app.dto.OrderDTO;
import com.cts.food_ordering_app.dto.PlaceOrderDTO;
import com.cts.food_ordering_app.entities.CartItems;
import com.cts.food_ordering_app.entities.FoodItem;
import com.cts.food_ordering_app.entities.Order;
import com.cts.food_ordering_app.entities.User;
import com.cts.food_ordering_app.enums.OrderStatus;
import com.cts.food_ordering_app.exception.ResourceNotFoundException;
import com.cts.food_ordering_app.repository.CartItemsRepository;
import com.cts.food_ordering_app.repository.FoodItemRepository;
import com.cts.food_ordering_app.repository.OrderRepository;
import com.cts.food_ordering_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
	
	private final FoodItemRepository foodItemRepository;
	
	private final OrderRepository orderRepository;
	
	private final CartItemsRepository cartItemsRepository;
	
	private final UserRepository userRepository;

	@Override
	public List<FoodItemDTO> getAllFoodItems() {
		
		return foodItemRepository.findAll().stream().map(FoodItem::getFoodItemDTO).collect(Collectors.toList());
	}

	@Override
	public List<FoodItemDTO> searchFoodItemByName(String name) {
		return foodItemRepository.findAllByNameContaining(name).stream().map(FoodItem::getFoodItemDTO).collect(Collectors.toList());
	}

	@Override
	public ResponseEntity<?> addFoodItemToCart(CartDTO cartDTO) { 
		try {
		System.out.println("Received CartDTO:  "+ cartDTO);
		Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(cartDTO.getUserId(), OrderStatus.PENDING);
		
	 
		if (pendingOrder == null) {
			User user = userRepository.findById(cartDTO.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
			pendingOrder = new Order();
			pendingOrder.setUser(user);
			pendingOrder.setOrderStatus(OrderStatus.PENDING) ;
			pendingOrder.setPrice(0L);
			pendingOrder.setDate(new Date());
			pendingOrder.setCartItems(new ArrayList<>());
			pendingOrder = orderRepository.save(pendingOrder);
	} 
		//checking of previous cartItems have my same food
		Optional<CartItems> optionalCartItem = cartItemsRepository.findByUserIdAndFoodItemIdAndOrderId(cartDTO.getUserId(), cartDTO.getFoodItemId(), pendingOrder.getId());
	 
		if (optionalCartItem.isPresent()) {
			CartItems existingCartItem = optionalCartItem.get();
			FoodItem foodItem = existingCartItem.getFoodItem();		
			
			existingCartItem.setQuantity(existingCartItem.getQuantity() + 1);
			existingCartItem.setPrice(existingCartItem.getPrice() + foodItem.getPrice());
			CartItems updatedCartItem = cartItemsRepository.save(existingCartItem);
	 		
			pendingOrder. setPrice(pendingOrder.getPrice() + foodItem.getPrice());	 
			orderRepository.save(pendingOrder);
	 
			CartDTO updatedCartItemDTO = new CartDTO();	 
			updatedCartItemDTO.setId(updatedCartItem.getId());	 
			updatedCartItemDTO.setPrice(updatedCartItem.getPrice()); 
			updatedCartItemDTO.setQuantity(updatedCartItem.getQuantity());
			updatedCartItemDTO.setFoodItemId(updatedCartItem. getFoodItem().getId());
			updatedCartItemDTO.setOrderId(pendingOrder.getId());
			updatedCartItemDTO.setFoodItemName(updatedCartItem.getFoodItem().getName());
			updatedCartItemDTO.setUserId(updatedCartItem.getUser().getId());
			return ResponseEntity.status(HttpStatus.OK).body(updatedCartItemDTO);
	 
	}
		// if my new food item is not in cart item means add new food item
		else {
			Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(cartDTO.getFoodItemId());
			Optional<User> optionalUser = userRepository.findById(cartDTO.getUserId());
			
			if(optionalFoodItem.isPresent() && optionalUser.isPresent()) {
				
				FoodItem foodItem = optionalFoodItem.get();
				User user = optionalUser.get();
				
				CartItems cartItems = new CartItems();
				cartItems.setFoodItem(foodItem);
				cartItems.setUser(user);
				cartItems.setQuantity(1L);
				cartItems.setOrder(pendingOrder);
				cartItems.setPrice(foodItem.getPrice());
				
				CartItems updatedCart = cartItemsRepository.save(cartItems);
				pendingOrder.setPrice(pendingOrder.getPrice() + cartItems.getPrice());
				
				pendingOrder.getCartItems().add(updatedCart);
				orderRepository.save(pendingOrder);
				
				CartDTO updatedCartItemDTO = new CartDTO();
				updatedCartItemDTO.setId(updatedCart.getId());
				updatedCartItemDTO.setPrice(updatedCart.getPrice());
				updatedCartItemDTO.setQuantity(updatedCart.getQuantity());
				updatedCartItemDTO.setFoodItemId(updatedCart.getFoodItem().getId());
				updatedCartItemDTO.setOrderId(pendingOrder.getId());
				updatedCartItemDTO.setFoodItemName(foodItem.getName());
				updatedCartItemDTO.setUserId(user.getId());
				
				System.out.println("Updated CartDTO: "+updatedCartItemDTO);
				return ResponseEntity.status(HttpStatus.CREATED).body(updatedCartItemDTO);
				
			}else {
				throw new ResourceNotFoundException("user or foodItem not found");
			}
		}
	}
	
	catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding book to cart: " + e.getMessage());
    }
}

	@Override
	public OrderDTO getCartByUserId(Long userId) {
		Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
		List<CartDTO> cartDTOList = pendingOrder.getCartItems().stream().map(CartItems::getCartItemsDTO).collect(Collectors.toList());
		OrderDTO orderDTO = new OrderDTO();
		orderDTO.setCartDTO(cartDTOList);
		orderDTO.setAmount(pendingOrder.getPrice());
		orderDTO.setId(pendingOrder.getId());
		orderDTO.setOrderStatus(pendingOrder.getOrderStatus());
		return orderDTO;
	}

	@Override
	public OrderDTO addMinusFoodItem(Long userId, Long foodItemId) {
		Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
		Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(foodItemId);
		Optional<CartItems> optionalCartItems =cartItemsRepository.findByUserIdAndFoodItemIdAndOrderId(userId, foodItemId, pendingOrder.getId());
		if(optionalCartItems.isPresent() && optionalFoodItem.isPresent()) {
			CartItems cartItems = optionalCartItems.get();
			cartItems.setQuantity(cartItems.getQuantity() - 1);
			cartItems.setPrice(optionalCartItems.get().getPrice()- optionalFoodItem.get().getPrice());
			pendingOrder.setPrice(pendingOrder.getPrice() - optionalFoodItem.get().getPrice());
			cartItemsRepository.save(cartItems);
			orderRepository.save(pendingOrder);
	
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setId(pendingOrder.getId());
			orderDTO.setOrderDescription (pendingOrder.getDescription());
			orderDTO.setDate(pendingOrder.getDate());
			orderDTO.setAmount (pendingOrder.getPrice());
			orderDTO.setAddress (pendingOrder.getAddress());
			orderDTO.setOrderStatus (pendingOrder.getOrderStatus());
			orderDTO.setPaymentType(pendingOrder.getPaymentType());
			orderDTO.setUsername(pendingOrder.getUser().getName());

			List<CartDTO> cartDTOList = pendingOrder.getCartItems().stream().map(CartItems::getCartItemsDTO).collect(Collectors.toList());
			orderDTO.setCartDTO(cartDTOList);
			return orderDTO;
		}
		return null;
	}
	

	@Override
	public OrderDTO addPlusFoodItem(Long userId, Long foodItemId) {
		Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
		Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(foodItemId);
		Optional<CartItems> optionalCartItems =cartItemsRepository.findByUserIdAndFoodItemIdAndOrderId(userId, foodItemId, pendingOrder.getId());
		
		if(optionalCartItems.isPresent() && optionalFoodItem.isPresent()) {
			CartItems cartItems = optionalCartItems.get();
			cartItems.setQuantity(cartItems.getQuantity() + 1);
			cartItems.setPrice(optionalCartItems.get().getPrice()+optionalFoodItem.get().getPrice());
			pendingOrder.setPrice(pendingOrder.getPrice() + optionalFoodItem.get().getPrice());
			cartItemsRepository.save(cartItems);
			orderRepository.save(pendingOrder);
			
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setId(pendingOrder.getId());
			orderDTO.setOrderDescription (pendingOrder.getDescription());
			orderDTO.setDate(pendingOrder.getDate());
			orderDTO.setAmount (pendingOrder.getPrice());
			orderDTO.setAddress (pendingOrder.getAddress());
			orderDTO.setOrderStatus (pendingOrder.getOrderStatus());
			orderDTO.setPaymentType(pendingOrder.getPaymentType());
			orderDTO.setUsername(pendingOrder.getUser().getName());
			

						List<CartDTO> cartDTOList = pendingOrder.getCartItems().stream().map(CartItems::getCartItemsDTO).collect(Collectors.toList());
						orderDTO.setCartDTO(cartDTOList);
						return orderDTO;
		}
		return null;
	}

	@Override
	public OrderDTO placeOrder(PlaceOrderDTO placeOrderDTO) {
		Order existingOrder = orderRepository.findByUserIdAndOrderStatus(placeOrderDTO.getUserId(), OrderStatus.PENDING);
		Optional<User> optionalUser = userRepository.findById(placeOrderDTO.getUserId());
		if(optionalUser.isPresent()) 
		{
			User user = optionalUser.get();
			
			if(existingOrder!=null)
			{
			existingOrder.setOrderStatus(OrderStatus.SUBMITTED);
			existingOrder.setAddress(placeOrderDTO.getAddress());
			existingOrder.setDate(new Date());
			existingOrder.setPaymentType(placeOrderDTO.getPayment());
			existingOrder.setDescription(placeOrderDTO.getOrderDescription());
			existingOrder.setPrice(existingOrder.getPrice());
			orderRepository.save(existingOrder);
			}
			else {  
			
				existingOrder= new Order();
				existingOrder.setOrderStatus(OrderStatus.SUBMITTED);
				existingOrder.setUser(user);
				existingOrder.setPrice(0L);
				existingOrder.setAddress(placeOrderDTO.getAddress());
				existingOrder.setDate(new Date());
				existingOrder.setPaymentType(placeOrderDTO.getPayment());
				existingOrder.setDescription(placeOrderDTO.getOrderDescription());
				orderRepository.save(existingOrder);
		}

			OrderDTO orderDTO = existingOrder.getOrderDTO();
			orderDTO.setOrder(existingOrder);
		    return orderDTO;
	}
		return null;
	}
	

	@Override
	public List<OrderDTO> getOrdersByUserId(Long userId) {
		return orderRepository.findAllByUserIdAndOrderStatus(userId,OrderStatus.SUBMITTED).stream().map(Order::getOrderDTO).collect(Collectors.toList());
	}
	
	@Override
	public void removeFoodItemFromCart(Long userId, Long foodItemId) {
	    Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
	    if (pendingOrder != null) {
	        Optional<CartItems> optionalCartItem = cartItemsRepository.findByUserIdAndFoodItemIdAndOrderId(userId, foodItemId, pendingOrder.getId());
	        if (optionalCartItem.isPresent()) {
	            CartItems cartItem = optionalCartItem.get();
	            pendingOrder.setPrice(pendingOrder.getPrice() - cartItem.getPrice());
	            cartItemsRepository.delete(cartItem);
	            orderRepository.save(pendingOrder);
	        }
	    } else {
	        throw new IllegalArgumentException("No pending order found for the user");
	    }
	}
}
