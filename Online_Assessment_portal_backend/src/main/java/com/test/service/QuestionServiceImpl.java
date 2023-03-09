package com.test.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.test.entity.Question;
import com.test.exception.ExceptionHandler;
import com.test.exception.NotFoundException;
import com.test.exception.QuestionNotFoundException;
import com.test.repository.QuestionRepository;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository queRepo;

	@Override
	public List<Question> showAllQuestion() {

		try {
			List<Question> allQuestion = (List<Question>) queRepo.findAll();
			if (allQuestion.isEmpty())
				throw new QuestionNotFoundException("No Question are Present, Create questions to view");
			return allQuestion;
		} catch (Exception e) {
			throw new ExceptionHandler("Have Issue in Question Service Layer");
		}
	}

	@Override
	public Question addQuestion(Question question) {

		if (question.getQname().isEmpty() || question.getAnswer().isEmpty()) {
			throw new QuestionNotFoundException("Question Fields are Mandatory, Fill all the Fields");
		}
		try {
			return queRepo.save(question);
		} catch (Exception e) {
			throw new ExceptionHandler("Error in Question Service layer");
		}
	}

	@Override
	public List<Question> getQuestionsForExamId(int id) {

		try {
			return queRepo.findByEnameId(id);
		} catch (NotFoundException e) {
			throw new NotFoundException("Question with the given id is not present");
		}
	}

	@Override
	public Question editQuestionById(int id, Question question) {

		try {
			question.setId(id);
			return queRepo.save(question);
		} catch (Exception e) {
			throw new ExceptionHandler("Question Id is not fount in database" + e.getMessage());
		}
	}

	@Override
	public void deleteQuestionById(int id) {

		try {
			queRepo.deleteById(id);
		} catch (Exception e) {
			throw new ExceptionHandler("Question Id is not found to delete this question" + e.getMessage());
		}
	}

}
