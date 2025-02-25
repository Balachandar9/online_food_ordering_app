package com.cts.food_ordering_application.testservice;
	
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

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
import com.cts.food_ordering_app.service.admin.AdminServiceImpl;
	 
	 
	public class TestAdminServiceImpl {
	 
	    @Mock
	    private CategoryRepository categoryRepository;
	 
	    @Mock
	    private FoodItemRepository foodItemRepository;
	 
	    @Mock
	    private OrderRepository orderRepository;
	 
	    @InjectMocks
	    private AdminServiceImpl adminService;
	 
	    @BeforeEach
	    void setUp() {
	        MockitoAnnotations.openMocks(this);
	    }
	 
	    @Test
	    void testCreatedCategory() {
	        CategoryDTO categoryDTO = new CategoryDTO();
	        categoryDTO.setName("Nonveg");
	        categoryDTO.setDescription("A symphony of spices and succulent cuts....");
	 
	        Category category = new Category();
	        category.setName(categoryDTO.getName());
	        category.setDescription(categoryDTO.getDescription());
	 
	        when(categoryRepository.save(any(Category.class))).thenReturn(category);
	 
	        Category result = adminService.createdCategory(categoryDTO);
	 
	        assertNotNull(result);
	        assertEquals("Nonveg", result.getName());
	        verify(categoryRepository, times(1)).save(any(Category.class));
	    }
	 
	    @Test
	    void testGetAllCategories() {
	        List<Category> categories = new ArrayList<>();
	        Category category = new Category();
	        category.setName("Nonveg");
	        categories.add(category);
	 
	        when(categoryRepository.findAll()).thenReturn(categories);
	 
	        List<CategoryDTO> result = adminService.getAllCategories();
	 
	        assertNotNull(result);
	        assertEquals(1, result.size());
	        verify(categoryRepository, times(1)).findAll();
	    }
	 
	    @Test
	    void testPostFoodItem() {
	        Long categoryId = 1L;
	        FoodItemDTO foodDTO = new FoodItemDTO();
	        foodDTO.setName("Food Name");
	        foodDTO.setPrice(100L);
	        foodDTO.setDescription("Description");
	 
	        Category category = new Category();
	        category.setId(categoryId);
	 
	        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));
	        when(foodItemRepository.save(any(FoodItem.class))).thenAnswer(invocation -> {
	            FoodItem foodItem = invocation.getArgument(0);
	            foodItem.setId(1L);
	            return foodItem;
	        });
	 
	        FoodItem result = adminService.postFoodItem(categoryId, foodDTO);
	 
	        assertNotNull(result);
	        assertEquals("Food Name", result.getName());
	        verify(categoryRepository, times(1)).findById(categoryId);
	        verify(foodItemRepository, times(1)).save(any(FoodItem.class));
	    }
	 
	    @Test
	    void testDeleteFoodItem() {
	        Long foodItemId = 1L;
	        FoodItem foodItem = new FoodItem();
	        foodItem.setId(foodItemId);
	 
	        when(foodItemRepository.findById(foodItemId)).thenReturn(Optional.of(foodItem));
	 
	        adminService.deleteFoodItem(foodItemId);
	 
	        verify(foodItemRepository, times(1)).findById(foodItemId);
	        verify(foodItemRepository, times(1)).deleteById(foodItemId);
	    }
	 
	    @Test
	    void testGetFoodItemById() {
	    	 Long foodItemId = 1L;
	    	    FoodItem foodItem = mock(FoodItem.class);
	 
	    	    FoodItemDTO foodItemDTO = new FoodItemDTO();
	    	    foodItemDTO.setId(foodItemId);
	    	    foodItemDTO.setName("Food Name");
	 
	    	    when(foodItem.getFoodItemDTO()).thenReturn(foodItemDTO);
	    	    when(foodItemRepository.findById(foodItemId)).thenReturn(Optional.of(foodItem));
	 
	    	    FoodItemDTO result = adminService.getFoodItemById(foodItemId);
	 
	    	    assertNotNull(result);
	    	    assertEquals(foodItemId, result.getId());
	    	    assertEquals("Food Name", result.getName());
	    	    verify(foodItemRepository, times(1)).findById(foodItemId);
	    	    verify(foodItem, times(1)).getFoodItemDTO();
	    }
	 
	    @Test
	    void testGetAllFoodItems() {
	 
	    	    List<FoodItem> foodItems = new ArrayList<>();
	    	    FoodItem foodItem = mock(FoodItem.class);
	    	    foodItems.add(foodItem);
	 
	    	    FoodItemDTO foodItemDTO = new FoodItemDTO();
	    	    foodItemDTO.setName("Food Name");
	 
	    	    when(foodItem.getFoodItemDTO()).thenReturn(foodItemDTO);
	    	    when(foodItemRepository.findAll()).thenReturn(foodItems);
	 
	    	    List<FoodItemDTO> result = adminService.getAllFoodItems();
	 
	    	    assertNotNull(result);
	    	    assertEquals(1, result.size());
	    	    assertEquals("Food Name", result.get(0).getName());
	    	    verify(foodItemRepository, times(1)).findAll();
	    	    verify(foodItem, times(1)).getFoodItemDTO();
	    	}
	 
	    @Test
	    void testGetAllOrders() {
	    	 List<Order> orders = new ArrayList<>();
	    	    Order order = mock(Order.class);
	    	    orders.add(order);
	 
	    	    OrderDTO orderDTO = new OrderDTO();
	    	    orderDTO.setId(1L);
	 
	    	    when(order.getOrderDTO()).thenReturn(orderDTO);
	    	    when(orderRepository.findAllByOrderStatus(OrderStatus.SUBMITTED)).thenReturn(orders);
	 
	    	    List<OrderDTO> result = adminService.getAllOrders();
	 
	    	    assertNotNull(result);
	    	    assertEquals(1, result.size());
	    	    assertEquals(1L, result.get(0).getId());
	    	    verify(orderRepository, times(1)).findAllByOrderStatus(OrderStatus.SUBMITTED);
	    	    verify(order, times(1)).getOrderDTO();
	    }
	}


