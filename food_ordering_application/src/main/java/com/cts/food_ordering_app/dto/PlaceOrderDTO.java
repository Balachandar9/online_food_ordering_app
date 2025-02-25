package com.cts.food_ordering_app.dto;

import lombok.Data;

@Data
public class PlaceOrderDTO {
	
	private Long userId;
	private String address;
	private String orderDescription;
	private String payment;

}
