package com.test.service;

import java.util.List;

import com.test.entity.Question;

public interface QuestionService {

	public List<Question> showAllQuestion();

	public Question addQuestion(Question question);

	public List<Question> getQuestionsForExamId(int id);

	public Question editQuestionById(int id, Question question);

	public void deleteQuestionById(int id);

}
