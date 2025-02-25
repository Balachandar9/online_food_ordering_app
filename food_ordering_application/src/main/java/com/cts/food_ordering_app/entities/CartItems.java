package com.cts.food_ordering_app.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.cts.food_ordering_app.dto.CartDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class CartItems {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long price;
	private Long quantity;
	
	@ManyToOne(fetch = FetchType.LAZY,optional =false)
	@JoinColumn(name="food_items_id",nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private FoodItem foodItem;
	
	
	@ManyToOne(fetch = FetchType.LAZY,optional =false)
	@JoinColumn(name="user_id",nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="order_id")
	private Order order;
	
	public CartDTO getCartItemsDTO() {
		CartDTO cartDTO = new CartDTO();
		cartDTO.setId(id);
		cartDTO.setQuantity(quantity);
		cartDTO.setFoodItemId(foodItem.getId());
		cartDTO.setFoodItemName(foodItem.getName());
		cartDTO.setPrice(price);
		cartDTO.setUserId(user.getId());
		return cartDTO;
		
	}
	

}
