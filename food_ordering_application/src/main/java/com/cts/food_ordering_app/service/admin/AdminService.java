package com.cts.food_ordering_app.service.admin;

import java.util.List;

import com.cts.food_ordering_app.dto.CategoryDTO;
import com.cts.food_ordering_app.dto.FoodItemDTO;
import com.cts.food_ordering_app.dto.OrderDTO;
import com.cts.food_ordering_app.entities.Category;
import com.cts.food_ordering_app.entities.FoodItem;

public interface AdminService {

	Category createdCategory(CategoryDTO categoryDTO);

	List<CategoryDTO> getAllCategories();
	
	FoodItem postFoodItem(Long categoryId, FoodItemDTO foodItemDTO);
	
	List<FoodItemDTO> getAllFoodItems();
	
	void deleteFoodItem(Long id);
	
	FoodItemDTO getFoodItemById(Long id);
	
	FoodItemDTO updateFoodItem(Long categoryId, Long foodItemId,FoodItemDTO foodItemDTO);
	
	List<OrderDTO> getAllOrders();
	
	void deleteCategory(Long categoryId);
	
	

}
