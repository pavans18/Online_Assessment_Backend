package com.test.service;

import java.util.List;
import java.util.Optional;

import com.test.entity.Exam;

public interface ExamService {
	
	public List<Exam> showAllExams();

	public Optional<Exam> getParticularExamById(int id);

	public Exam addNewExam(Exam exam);

	public void deleteExamById(int id);


}
