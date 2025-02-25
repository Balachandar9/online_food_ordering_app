package com.cts.food_ordering_app.service.user;

import com.cts.food_ordering_app.dto.SignupDTO;
import com.cts.food_ordering_app.dto.UserDTO;

public interface UserService {

	UserDTO createUser(SignupDTO signupDTO);

	boolean hasUserWithEmail(String email);
	
	

}
