package com.example.service;

import java.util.List;
import com.example.entity.User;

public interface UserService {

	public List<User> getAllusers();

	public User getUserByuserName(String name);

	public Boolean existsByUserName(String userName);

	public Boolean existsByEmail(String email);

	public User addUser(User user);

	public User getUserByEmail(String email);
}
