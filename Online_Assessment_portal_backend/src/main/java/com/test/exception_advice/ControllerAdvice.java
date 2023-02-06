package com.test.exception_advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.test.exception.ExamNotFoundException;
import com.test.exception.QuestionNotFoundException;
import com.test.exception.SubjectNotFoundException;

@org.springframework.web.bind.annotation.ControllerAdvice
public class ControllerAdvice {

	@ExceptionHandler(SubjectNotFoundException.class)
	public ResponseEntity<String> handleSubjectNotFound(SubjectNotFoundException exception) {

		return new ResponseEntity<String>(exception.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(QuestionNotFoundException.class)
	public ResponseEntity<String> handleQuestionNotFound(QuestionNotFoundException exception) {

		return new ResponseEntity<String>(exception.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ExamNotFoundException.class)
	public ResponseEntity<String> handleExamFound(ExamNotFoundException exception) {

		return new ResponseEntity<String>(exception.getMessage(), HttpStatus.BAD_REQUEST);
	}

}
