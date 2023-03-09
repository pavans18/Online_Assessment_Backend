package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.User;
import com.example.exception.ExceptionHandler;
import com.example.exception.UserNotFoundException;
import com.example.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User getUserByuserName(String name) {

		if (name == null) {
			throw new ExceptionHandler("Wrong Credentials");
		}
		try {
			return userRepository.findByUsername(name).get();
		} catch (IllegalArgumentException e) {
			throw new UserNotFoundException("User Details is Empty" + e.getMessage());
		} catch (Exception e) {
			throw new ExceptionHandler("Login Fields Cannot be empty");
		}

	}

	@Override
	public Boolean existsByUserName(String userName) {

		if (userName.isEmpty()) {
			throw new ExceptionHandler("User name Cannot be Empty");
		}
		try {
			return userRepository.existsByUsername(userName);
		} catch (IllegalArgumentException e) {
			throw new UserNotFoundException("User Fields are empty, check it" + e.getMessage());
		}
	}

	@Override
	public Boolean existsByEmail(String email) {

		if (email.isEmpty()) {
			throw new ExceptionHandler("Email Field is Empty, Enter Correct Email");
		}
		try {
			return userRepository.existsByEmail(email);
		} catch (Exception e) {
			throw new UserNotFoundException("User email is empty enter valid user email" + e.getMessage());
		}
	}

	@Override
	public User addUser(User user) {

		if (user.getUsername().isEmpty() || user.getUsername().length() == 0) {
			throw new ExceptionHandler("Username is empty enter valid username");

		} else if (user.getEmail().isEmpty() || user.getEmail().length() == 0) {
			throw new ExceptionHandler("User email is empty enter valid user email");

		} else if (user.getPassword().isEmpty() || user.getPassword().length() == 0) {
			throw new ExceptionHandler("User Password is empty enter valid Password");
		}

		try {
			return userRepository.save(user);
		} catch (Exception e) {
			throw new ExceptionHandler("User login Fields are empty" + e.getMessage());
		}
	}

	@Override
	public User getUserByEmail(String email) {

		if (email.isEmpty()) {
			throw new ExceptionHandler("Email is not valid to get user");
		}
		try {
			return userRepository.findByEmail(email);
		} catch (Exception e) {
			throw new UserNotFoundException("Email is not valid, enter the valid email to find user" + e.getMessage());
		}
	}

	@Override
	public List<User> getAllusers() {

		return (List<User>) userRepository.findAll();
	}

	@Override
	public List<User> getStudents() {

		return userRepository.getAllStudents();
	}

}
