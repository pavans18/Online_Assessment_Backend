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
		try {
			List<Exam> allExam = (List<Exam>) examRepo.findAll();
			if (allExam.isEmpty())
				throw new ExceptionHandler("No Exams are present, Create Exam to see All Exams");
			return allExam;
		} catch (Exception e) {
			throw new ExamNotFoundException("Exam list is Empty" + e.getMessage());
		}
	}

	@Override
	public Exam addNewExam(Exam exam) {
		if (exam.getMarks().equals("") || exam.getTotalQuestion().equals("")) {
			throw new NotFoundException("Exam Name is required");
		}
		try {
			return examRepo.save(exam);
		} catch (Exception e) {
			throw new ExceptionHandler("Exam name cannot be empty");
		}
	}

	@Override
	public void deleteExamById(int id) {
		try {
			examRepo.deleteById(id);
		} catch (Exception e) {
			throw new ExceptionHandler("No Exam is present for the given id");
		}
	}

	@Override
	public Optional<Exam> getParticularExamById(int id) {
		try {
			Optional<Exam> exam = examRepo.findById(id);
			return exam;
		} catch (NotFoundException e) {
			throw new ExamNotFoundException("Exam Id is not found" + e.getMessage());
		} catch (IllegalArgumentException e) {
			throw new ExceptionHandler("Exam doesn't Exist for the given Id" + e.getMessage());
		}

	}

	@Override
	public List<Exam> getExamByUserId(Long userId) {
		try {
			return examRepo.getByUserId(userId);
		} catch (Exception e) {
			throw new ExceptionHandler("No exams are present for this user Id");
		}

	}
}
