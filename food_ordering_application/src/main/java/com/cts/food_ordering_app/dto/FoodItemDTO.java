package com.cts.food_ordering_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class FoodItemDTO {
	
	private Long id;
	private String name;
	private String description;
	private Long price;	
	private Long categoryId;
	private String categoryName;

}
