package com.cts.food_ordering_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.food_ordering_app.entities.User;
import com.cts.food_ordering_app.enums.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{


	User findFirstByEmail(String email);

	User findByUserRole(UserRole admin);

}
