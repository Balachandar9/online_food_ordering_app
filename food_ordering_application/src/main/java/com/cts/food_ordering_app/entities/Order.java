package com.cts.food_ordering_app.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.cts.food_ordering_app.dto.CartDTO;
import com.cts.food_ordering_app.dto.OrderDTO;
import com.cts.food_ordering_app.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String description;
	private String address;
	private String paymentType;
	private Date date;
	private Long price;
	private OrderStatus orderStatus;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id",referencedColumnName="id")
	private User user;
                         
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "order", cascade = CascadeType.ALL,orphanRemoval = true)
	@JsonIgnore
	private List<CartItems> cartItems = new ArrayList<>(); 
	
	
	public OrderDTO getOrderDTO() {
		OrderDTO orderDTO = new OrderDTO();
		orderDTO.setId(id);
		orderDTO.setOrderStatus(orderStatus);
		orderDTO.setAmount(price);
		orderDTO.setAddress(address);
		orderDTO.setPaymentType(paymentType);
		orderDTO.setUsername(user.getName());
		orderDTO.setDate(date);
		orderDTO.setOrderDescription(description);
		
		List<CartDTO> cartDTOList = cartItems.stream().map(CartItems::getCartItemsDTO).collect(Collectors.toList());
		orderDTO.setCartDTO(cartDTOList);
		return orderDTO;
	}
	

}
