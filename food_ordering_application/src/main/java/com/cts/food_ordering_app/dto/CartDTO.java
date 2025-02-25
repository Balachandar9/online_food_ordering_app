package com.cts.food_ordering_app.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class CartDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private long price;
	private Long quantity;
	private Long foodItemId;
	private Long orderId;
	private String foodItemName;
	private Long userId;

}
