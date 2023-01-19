package com.test.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.test.entity.Question;
import com.test.repository.QuestionRepository;


@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository queRepo;
	
	@Override
	public List<Question> showAllQuestion() {
		return (List<Question>) queRepo.findAll();
	}

	@Override
	public Question addQuestion(Question question) {
		return queRepo.save(question);
	}

	@Override
	public List<Question> getQuestionsForExamId(int id) {
		return queRepo.findByEnameId(id);
	}

	@Override
	public Question editQuestionById(int id, Question question) {
		question.setId(id);
		return queRepo.save(question);
			
	}

	@Override
	public void deleteQuestionById(int id) {
		queRepo.deleteById(id);
	}

}
