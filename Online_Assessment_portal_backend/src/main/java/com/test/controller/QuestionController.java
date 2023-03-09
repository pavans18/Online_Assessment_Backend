package com.test.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.test.entity.Question;
import com.test.exception.ExceptionHandler;
import com.test.exception.NotFoundException;
import com.test.exception.QuestionNotFoundException;
import com.test.service.QuestionService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/apiquestion")
public class QuestionController {

	@Autowired
	private QuestionService service;

	// get All Questions in the database
	@GetMapping("/showQuestions")
	public ResponseEntity<?> showAllQuestions() {

		try {
			List<Question> questions = service.showAllQuestion();
			return ResponseEntity.status(HttpStatus.OK).body(questions);
		} catch (ExceptionHandler e) {
			ExceptionHandler exception = new ExceptionHandler(e.getErrorMessage());
			return new ResponseEntity<String>(exception.getErrorMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// to add new Question
	@PostMapping("/addQuestion")
	public ResponseEntity<?> addQuestion(@RequestBody Question question) {

		if (question.getQname().equals("") || question.getAnswer().equals("")) {
			throw new NotFoundException("Question Parameters should not be Empty");
		}
		try {
			Question addQuestion = service.addQuestion(question);
			return ResponseEntity.status(HttpStatus.OK).body(addQuestion);
		} catch (Exception e) {
			ExceptionHandler exception = new ExceptionHandler("Error in QUestion Controller" + e.getMessage());
			return new ResponseEntity<String>(exception.getErrorMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// to get questions by examId
	@GetMapping("/showQuestionsByExam/{examId}")
	public ResponseEntity<?> showQuestionsByExam(@PathVariable(name = "examId") int id) {

		try {
			List<Question> questions = service.getQuestionsForExamId(id);
			return ResponseEntity.status(HttpStatus.OK).body(questions);
		} catch (Exception e) {
			throw new QuestionNotFoundException("Question with id" + id + "doesn't exist");
		}
	}

	// to edit question based on queId
	@PutMapping("/question/{id}")
	public ResponseEntity<?> editQuestion(@PathVariable(name = "id") int id, @RequestBody Question question) {

		try {
			Question updateQuestion = service.editQuestionById(id, question);
			return ResponseEntity.status(HttpStatus.OK).body(updateQuestion);
		} catch (Exception e) {
			throw new QuestionNotFoundException("Question with id" + id + "doesn't exist");
		}
	}

	// to delete question based on id
	@DeleteMapping("/deleteQuestion/{id}")
	public ResponseEntity<?> deleteQuestionById(@PathVariable(name = "id") int id) {

		try {
			service.deleteQuestionById(id);
			return ResponseEntity.status(HttpStatus.OK).body("Question Deleted");
		} catch (Exception e) {
			throw new QuestionNotFoundException("Question with id" + id + "doesn't exist");
		}
	}

	// to get all questions of particular exam using examId
	@GetMapping("/getQuestionsByExam/{id}")
	public List<Question> QuestionsByExam(@PathVariable("id") int id) {

		try {
			return service.getQuestionsForExamId(id);
		} catch (Exception e) {
			throw new QuestionNotFoundException("Question with id" + id + "doesn't exist");
		}
	}

	// delete a question in a particular exam
	@DeleteMapping("/deleteQuestionInExam/{id}")
	public ResponseEntity<?> deleteQuestionInParticularExam(@PathVariable("id") int id) {
		service.deleteQuestionById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Question has been Deleted");
	}

}
