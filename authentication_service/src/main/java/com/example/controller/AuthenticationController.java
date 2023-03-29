package com.example.controller;

import com.example.dto.JwtAuthResponse;
import com.example.dto.LoginRequestUser;
import com.example.dto.MessageResponse;
import com.example.dto.UserSignupRequest;
import com.example.entity.Role;
import com.example.entity.Roletype;
import com.example.entity.User;
import com.example.repository.RoleRepository;
import com.example.repository.UserRepository;
import com.example.security.jwt.JwtUtils;
import com.example.security.services.UserDetailsImpl;
import com.example.service.RoleService;
import com.example.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserService userService;

	@Autowired
	RoleService roleService;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequestUser loginRequestUser) {

		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequestUser.getUsername(), loginRequestUser.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());
		System.out.println("*********************");
		System.out.println("authenticate user");
		return ResponseEntity.ok(new JwtAuthResponse(jwt, userDetails.getId(), userDetails.getUsername(),
				userDetails.getEmail(), roles));

	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Validated @RequestBody UserSignupRequest signUpRequest) {

		if (userService.existsByUserName(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse(" UserName is Present try another!"));
		}

		if (userService.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Email is  present try another!"));
		}

		// To create new user(student)
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		Set<String> roleString = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (roleString == null) {

			Role userRole = roleService.findByName(Roletype.STUDENT)
					.orElseThrow(() -> new RuntimeException("RoleType is not found."));

//			System.out.println("****");
//			System.out.println(userRole);

			roles.add(userRole);
		} else {
			roleString.forEach(role -> {

				switch (role) {
				case "INSTRUCTOR":
					Role adminRole = roleService.findByName(Roletype.INSTRUCTOR)
							.orElseThrow(() -> new RuntimeException(" RoleType is not found."));
					roles.add(adminRole);

					break;

				default:
					Role userRole = roleService.findByName(Roletype.STUDENT)
							.orElseThrow(() -> new RuntimeException("RoleType is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userService.addUser(user);

		return ResponseEntity.ok(new MessageResponse("New User registered!"));
	}

}