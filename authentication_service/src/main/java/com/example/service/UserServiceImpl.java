package com.example.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.User;
import com.example.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User getUserByuserName(String name) {
		return userRepository.findByUsername(name).get();
	}

	@Override
	public Boolean existsByUserName(String userName) {
		return userRepository.existsByUsername(userName);
	}

	@Override
	public Boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public List<User> getAllusers() {
		return (List<User>) userRepository.findAll();
	}

}
