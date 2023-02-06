package com.test.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.test.exception.*;
import com.test.entity.Exam;
import com.test.repository.ExamRepository;

@Service
public class ExamServiceImpl implements ExamService {
	
	@Autowired
	private ExamRepository examRepo;
	
	@Override
	public List<Exam> showAllExams() {
		return (List<Exam>) examRepo.findAll();
	}
	
	@Override
	public Exam addNewExam(Exam exam) {
		if(exam.getMarks().equals("") || exam.getTotalQuestion().equals("")) {
			throw new ExamNotFoundException("Exam Name is required");
		}
		return examRepo.save(exam);
	}

	@Override
	public void deleteExamById(int id) {
		examRepo.deleteById(id);
	}

	@Override
	public Optional<Exam> getParticularExamById(int id) {
		Optional<Exam> exam =examRepo.findById(id);
		return exam;
	}
	

}
