package com.cts.food_ordering_app.dto;

import com.cts.food_ordering_app.enums.UserRole;

import lombok.Data;

@Data
public class UserDTO {
	
	private Long id;
	private String name;
	private String email;
	private String password;
	private UserRole userRole;
	

}
