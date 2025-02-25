package com.cts.food_ordering_app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
		
		@ExceptionHandler(BadCredentialsException.class)
		public ResponseEntity<String> handleBadCredentialsException(BadCredentialsException ex){
			return new ResponseEntity<>("invalid username or password", HttpStatus.UNAUTHORIZED);
		}
		
		@ExceptionHandler(IllegalArgumentException.class)
		public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex){
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
		@ExceptionHandler(FoodItemNotFoundException.class)
		public ResponseEntity<String> handleFoodItemNotFoundException(FoodItemNotFoundException ex){
			return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
		}
		@ExceptionHandler(ResourceNotFoundException.class)
	    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
	        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	    }
	}
	
	


