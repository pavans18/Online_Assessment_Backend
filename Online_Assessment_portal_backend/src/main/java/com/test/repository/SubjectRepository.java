package com.test.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.test.entity.Subject;

@Repository
public interface SubjectRepository extends CrudRepository<Subject, String> {

	@Query(nativeQuery = true, value = "select * from portal_subjects where subject_name = ?1 ")
	public Subject getSubjectByName(String name);

	@Modifying
	@Transactional
	public int deleteByName(String name);

}
