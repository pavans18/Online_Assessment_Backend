package com.example.service;

import java.util.Optional;
import com.example.entity.Role;
import com.example.entity.Roletype;

public interface RoleService {
	
	public Role addRole(Role role);
	
	public Optional<Role> findByName(Roletype name);
}
