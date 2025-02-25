package com.cts.food_ordering_app.service.jwt;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cts.food_ordering_app.entities.User;
import com.cts.food_ordering_app.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findFirstByEmail(username);
		if (user == null)
			{
			throw new UsernameNotFoundException("Username not found");
			}
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),getAuthorities(user));
		

		}
	private Collection<? extends GrantedAuthority> getAuthorities(User user){
		return List.of(new SimpleGrantedAuthority("ROLE_"+user.getUserRole().name()));
		


	}
	}

