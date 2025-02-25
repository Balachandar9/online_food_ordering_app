package com.cts.food_ordering_app.exception;

public class FoodItemNotFoundException extends RuntimeException{
	public FoodItemNotFoundException(String message) {
		super(message);
	}

}
