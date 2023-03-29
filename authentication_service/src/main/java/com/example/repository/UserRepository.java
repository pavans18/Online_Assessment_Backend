package com.example.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	
	
	@Query(value="select * from backend_users_portal where username=?1",nativeQuery = true)
	public Optional<User> findByUsername(String userName);
	
	public Boolean existsByUsername(String userName);
	
	public Boolean existsByEmail(String email);
	
	public User findByEmail(String email);
	
	@Query(value = "select id,email,username,password from backend_users_portal join backend_user_roles on backend_users_portal.id = backend_user_roles.user_id where backend_user_roles.role_id=2", nativeQuery = true)
	public List<User> getAllStudents();
}
