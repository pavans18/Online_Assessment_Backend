package com.test.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.test.entity.Result;

@Repository
public interface ResultRepository extends CrudRepository<Result, Integer> {

	// public List<Result> findByEmail(String email);

	@Query(nativeQuery = true, value = "select * from backend_result where user_id = (select id from backend_users where user_name = ?1)")
	public List<Result> getResultByUserName(String userName);

}
