package com.cts.food_ordering_app.service.admin;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.food_ordering_app.dto.CategoryDTO;
import com.cts.food_ordering_app.dto.FoodItemDTO;
import com.cts.food_ordering_app.dto.OrderDTO;
import com.cts.food_ordering_app.entities.Category;
import com.cts.food_ordering_app.entities.FoodItem;
import com.cts.food_ordering_app.entities.Order;
import com.cts.food_ordering_app.enums.OrderStatus;
import com.cts.food_ordering_app.repository.CategoryRepository;
import com.cts.food_ordering_app.repository.FoodItemRepository;
import com.cts.food_ordering_app.repository.OrderRepository;


@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	 private CategoryRepository categoryRepository;
	
	@Autowired
	private FoodItemRepository foodItemRepository;
	
	@Autowired
	private OrderRepository orderRepository;

	@Override
	public Category createdCategory(CategoryDTO categoryDTO) {
		Category category = new Category();
		category.setName(categoryDTO.getName());
		category.setDescription(categoryDTO.getDescription());
		return categoryRepository.save(category);
	}
	
	@Override
	public List<CategoryDTO> getAllCategories(){
		return categoryRepository.findAll().stream().map(Category::getCategoryDTO).collect(Collectors.toList()); 
	}
	@Override
	public FoodItem postFoodItem(Long categoryId, FoodItemDTO foodItemDTO) {
		Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
		if(optionalCategory.isPresent()) {
			FoodItem foodItem = new FoodItem();
			foodItem.setName(foodItemDTO.getName());
			foodItem.setPrice(foodItemDTO.getPrice());
			foodItem.setDescription(foodItemDTO.getDescription());
			foodItem.setCategory(optionalCategory.get());
			return foodItemRepository.save(foodItem);
		}
		return null;
	}

	@Override
	public List<FoodItemDTO> getAllFoodItems() {
		
		return foodItemRepository.findAll().stream().map(FoodItem::getFoodItemDTO).collect(Collectors.toList());
	}

	@Override
	public void deleteFoodItem(Long id) {
		Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(id);
		if(optionalFoodItem.isEmpty())
			throw new IllegalArgumentException("FoodItem with id" + id +"not found");
		foodItemRepository.deleteById(id);
		
	}

	@Override
	public FoodItemDTO getFoodItemById(Long id) {
		Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(id);
		if(optionalFoodItem.isPresent()) {
			FoodItem foodItem = optionalFoodItem.get();
			return foodItem.getFoodItemDTO();
		}
		return null;
	}

	@Override
	public FoodItemDTO updateFoodItem(Long categoryId, Long foodItemId, FoodItemDTO foodItemDTO) {
		Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
		Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(foodItemId);
		if(optionalCategory.isPresent() && optionalFoodItem.isPresent()) {
			FoodItem foodItem = optionalFoodItem.get();
			foodItem.setName(foodItemDTO.getName());
			foodItem.setDescription(foodItemDTO.getDescription());
			foodItem.setPrice(foodItemDTO.getPrice());
			foodItem.setCategory(optionalCategory.get());
			FoodItem updatedFoodItem = foodItemRepository.save(foodItem);
			FoodItemDTO updatedFoodItemDTO = new FoodItemDTO();
			updatedFoodItemDTO.setId(updatedFoodItem.getId());
			updatedFoodItemDTO.setName(updatedFoodItem.getName());
			updatedFoodItemDTO.setPrice(updatedFoodItem.getPrice());
			updatedFoodItemDTO.setDescription(updatedFoodItem.getDescription());
			updatedFoodItemDTO.setCategoryId(updatedFoodItem.getCategory().getId());
			updatedFoodItemDTO.setCategoryName(updatedFoodItem.getCategory().getName());
			return updatedFoodItemDTO;
		}
		return null;
	}

	@Override
	public List<OrderDTO> getAllOrders() {
		return orderRepository.findAllByOrderStatus(OrderStatus.SUBMITTED).stream().map(Order::getOrderDTO).collect(Collectors.toList());
	}	
	
	@Override
	public void deleteCategory(Long categoryId) {
	    Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
	    if (optionalCategory.isEmpty()) {
	        throw new RuntimeException("Category not found");
	    }
	    categoryRepository.deleteById(categoryId);
	}

}
