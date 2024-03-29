package com.test.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.test.entity.Exam;

@Repository
public interface ExamRepository extends CrudRepository<Exam, Integer> {

}
