package com.cts.food_ordering_app.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {
	
	private String username;
	private String password;

}
