package com.example.repository;

import com.example.entity.Role;
import com.example.entity.Roletype;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findRoleByName(Roletype name);
}