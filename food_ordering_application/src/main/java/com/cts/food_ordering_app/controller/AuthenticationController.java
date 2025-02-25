package com.cts.food_ordering_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.cts.food_ordering_app.dto.AuthenticationRequest;
import com.cts.food_ordering_app.dto.AuthenticationResponse;
import com.cts.food_ordering_app.entities.User;
import com.cts.food_ordering_app.repository.UserRepository;
import com.cts.food_ordering_app.utils.JwtUtil;


@RestController
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	public static final String TOKEN_PREFIX = "Bearer";
	public static final String HEADER_STRING = "Authorization";
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authRequest) {
	    try {
	        authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
	        );

	        UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
	        User user = userRepository.findFirstByEmail(authRequest.getUsername());
	        
	        String jwtToken = jwtUtil.generateToken(user.getId(), userDetails.getUsername(), user.getUserRole().name());
	        return ResponseEntity.ok(new AuthenticationResponse(jwtToken));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	    }
	}
	

	}

	