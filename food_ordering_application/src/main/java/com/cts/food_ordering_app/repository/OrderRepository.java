package com.cts.food_ordering_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cts.food_ordering_app.entities.Order;
import com.cts.food_ordering_app.enums.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

	Order findByUserIdAndOrderStatus(Long userId, OrderStatus pending);

	List<Order> findAllByUserIdAndOrderStatus(Long userId, OrderStatus submitted);

	List<Order> findAllByOrderStatus(OrderStatus orderStatus);


}
