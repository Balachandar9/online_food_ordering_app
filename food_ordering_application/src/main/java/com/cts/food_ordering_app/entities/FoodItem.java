package com.cts.food_ordering_app.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.cts.food_ordering_app.dto.FoodItemDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class FoodItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	
	@Lob
	private String description;
	private Long price;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="category_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Category category;
	
	
	
	
	
	public FoodItemDTO getFoodItemDTO() {
		FoodItemDTO foodItemDTO = new FoodItemDTO();
		foodItemDTO.setId(id);
		foodItemDTO.setName(name);
		foodItemDTO.setDescription(description);
		foodItemDTO.setPrice(price);
		foodItemDTO.setCategoryId(category.getId());
		foodItemDTO.setCategoryName(category.getName());
		return foodItemDTO;
		
	}

}
