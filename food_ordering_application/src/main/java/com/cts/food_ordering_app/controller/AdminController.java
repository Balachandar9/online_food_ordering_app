package com.cts.food_ordering_app.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.food_ordering_app.dto.CategoryDTO;
import com.cts.food_ordering_app.dto.FoodItemDTO;
import com.cts.food_ordering_app.dto.OrderDTO;
import com.cts.food_ordering_app.entities.Category;
import com.cts.food_ordering_app.entities.FoodItem;
import com.cts.food_ordering_app.service.admin.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/category")
	public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDTO)
	{
		Category createdcategory = adminService.createdCategory(categoryDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdcategory);
	}
	@GetMapping("/categories")
	public ResponseEntity<List<CategoryDTO>> getAllCategories()
	{
		List<CategoryDTO>allCategories=adminService.getAllCategories();
		return ResponseEntity.ok(allCategories);
	}
	
	@PostMapping("foodItem/{categoryId}")
	public ResponseEntity<FoodItem> postFoodItem(@PathVariable Long categoryId, @RequestBody FoodItemDTO foodItemDTO) 
	{
		FoodItem postedFoodItem=adminService.postFoodItem(categoryId,foodItemDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(postedFoodItem);
	}
	@GetMapping("/foodItems")
	public ResponseEntity<List<FoodItemDTO>> getAllFoodItems()
	{
		List<FoodItemDTO> foodItemDtoList = adminService.getAllFoodItems();
		return ResponseEntity.ok(foodItemDtoList);
	}
	@DeleteMapping("/foodItem/{id}")
	public ResponseEntity<Void> deleteFoodItem(@PathVariable Long id)
	{
		adminService.deleteFoodItem(id);//
		return ResponseEntity.noContent().build();
	}
	@GetMapping("/foodItem/{id}")
	public ResponseEntity<FoodItemDTO> getFoodItemById(@PathVariable Long id){
		FoodItemDTO foodItemDTO=adminService.getFoodItemById(id);
		if(foodItemDTO == null)
			{
			return ResponseEntity.notFound().build();
			}
		return ResponseEntity.ok(foodItemDTO);
	}
	@PutMapping("/{categoryId}/foodItem/{foodItemId}")
	public ResponseEntity<?> updateFoodItem(
			@PathVariable Long categoryId,
			@PathVariable Long foodItemId,
			@RequestBody FoodItemDTO foodItemDTO){
		FoodItemDTO updateFoodItem=adminService.updateFoodItem(categoryId, foodItemId, foodItemDTO);
		if(updateFoodItem == null)
			{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
			}
		return ResponseEntity.ok(updateFoodItem);
	}
	@GetMapping("/orders")
	public ResponseEntity<List<OrderDTO>> getAllOrders(){
		List<OrderDTO> orderDTOList = adminService.getAllOrders();
		return ResponseEntity.ok(orderDTOList);
	}
	
	@DeleteMapping("/category/{id}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
	    adminService.deleteCategory(id);
	    return ResponseEntity.noContent().build();
	}

}
