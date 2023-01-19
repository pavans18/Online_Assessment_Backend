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
import com.test.exception.NotFoundException;
import com.test.service.QuestionService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/apiquestion")
public class QuestionController {
	
	@Autowired
	private QuestionService service;
	
	//get All Questions in the database
	@GetMapping("/showQuestions")
	public ResponseEntity<?> showAllQuestions(){
		List<Question> questions = service.showAllQuestion();
		return ResponseEntity.status(HttpStatus.OK).body(questions);
	}
	
	//to add new Question
	@PostMapping("/addQuestion")
	public ResponseEntity<?> addQuestion(@RequestBody Question question){
		if(question.getQname().equals("") || question.getAnswer().equals("") ) {
			throw new NotFoundException("Question Parameters should not be Empty");
		}
		Question addQuestion = service.addQuestion(question);
		return ResponseEntity.status(HttpStatus.OK).body(addQuestion);
		}
	
	
	//to get questions by examId
	@GetMapping("/showQuestionsByExam/{examId}")
	public ResponseEntity<?> showQuestionsByExam(@PathVariable(name = "examId") int id){
		List<Question> questions = service.getQuestionsForExamId(id);
		return ResponseEntity.status(HttpStatus.OK).body(questions);
	}
	
	//to edit question based on queId
	@PutMapping("/question/{id}")
	public ResponseEntity<?> editQuestion(@PathVariable(name = "id") int id, @RequestBody Question question){
	
		Question updateQuestion = service.editQuestionById(id, question);
		
		return ResponseEntity.status(HttpStatus.OK).body(updateQuestion);
	}
	
	//to delete question based on id
	@DeleteMapping("/deleteQuestion/{id}")
	public ResponseEntity<?> deleteQuestionById(@PathVariable(name = "id") int id){

		service.deleteQuestionById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Question Deleted");
	}
	
	//to get all questions of particular exam using examId
	@GetMapping("/getQuestionsByExam/{id}")
	public List<Question> QuestionsByExam(@PathVariable("id") int id){
		return service.getQuestionsForExamId(id);
		
	}
	
	//delete a question in a particular exam
	@DeleteMapping("/deleteQuestionInExam/{id}")
	public ResponseEntity<?> deleteQuestionInParticularExam(@PathVariable("id") int id){
		service.deleteQuestionById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Question has been Deleted");
	}
	
}
