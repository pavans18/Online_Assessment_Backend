package com.example.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	
	public Optional<User> findByUsername(String userName);
	
	public Boolean existsByUsername(String userName);
	
	public Boolean existsByEmail(String email);
	
	public User findByEmail(String email);

}
