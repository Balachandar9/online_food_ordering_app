package com.cts.food_ordering_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.food_ordering_app.entities.FoodItem;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem,Long>{

	List<FoodItem> findAllByNameContaining(String title);

}
