package com.cts.food_ordering_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.food_ordering_app.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
