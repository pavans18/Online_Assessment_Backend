package com.test.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.entity.Exam;
import com.test.exception.ExamNotFoundException;
import com.test.exception.NotFoundException;
import com.test.repository.ExamRepository;
import com.test.service.ExamService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/apiexam")
public class ExamController {

	@Autowired
	private ExamRepository examRepository;

	@Autowired
	private ExamService service;

	// to get all exams
	@GetMapping("/showAvailableExams")
	public ResponseEntity<?> getAllExams() {
		List<Exam> exams = service.showAllExams();
		return ResponseEntity.status(HttpStatus.OK).body(exams);
	}

	// to add new exam
	@PostMapping("/addExam")
	public ResponseEntity<?> addExam(@RequestBody Exam exam) {
		if(exam.getMarks().equals("") || exam.getTotalQuestion().equals("")) {
			throw new ExamNotFoundException("Exam name is required" + exam );
		}
		Exam examCreated = service.addNewExam(exam); 
		return ResponseEntity.status(HttpStatus.CREATED).body(examCreated);
	}

	// to get details of particular exam
	@GetMapping("/getParticularExam/{id}")
	public ResponseEntity<?> getParticularExam(@PathVariable int id) {
		Optional<Exam> particularExam = examRepository.findById(id);
		return ResponseEntity.status(HttpStatus.OK).body(particularExam);
	}

	// to delete exam by id
	@DeleteMapping("/deleteExam/{examId}")
	public ResponseEntity<?> DeleteExam(@PathVariable int examId) {
		service.deleteExamById(examId);
		return ResponseEntity.status(HttpStatus.GONE).body("Exam has been deleted");
	}
}
