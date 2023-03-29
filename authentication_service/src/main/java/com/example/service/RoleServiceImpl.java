package com.example.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.entity.Role;
import com.example.entity.Roletype;
import com.example.exception.ExceptionHandler;
import com.example.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService{

	@Autowired
	private RoleRepository roleRepository;
	
	@Override
	public Role addRole(Role role) {
		
		if(role == null) {
			throw new ExceptionHandler("Role is Empty");
		}
		return roleRepository.save(role);
	}

	@Override
	public Optional<Role> findByName(Roletype name) {
		
		return roleRepository.findRoleByName(name);
	}
}
