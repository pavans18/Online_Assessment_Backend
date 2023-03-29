package com.test.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.test.entity.Question;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Integer> {

	public List<Question> findByExamNameId(int id);

}
