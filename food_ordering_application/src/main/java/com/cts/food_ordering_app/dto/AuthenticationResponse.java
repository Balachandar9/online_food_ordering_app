package com.cts.food_ordering_app.dto;

import lombok.Data;

@Data
public class AuthenticationResponse {

	private String jwtToken;

	public AuthenticationResponse(String jwt) {
		this.jwtToken=jwt;
	}
}
