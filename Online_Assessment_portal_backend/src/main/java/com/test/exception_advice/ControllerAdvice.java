package com.test.exception_advice;

import java.util.NoSuchElementException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.test.exception.ExamNotFoundException;
import com.test.exception.NotFoundException;
import com.test.exception.QuestionNotFoundException;
import com.test.exception.SubjectNotFoundException;

@org.springframework.web.bind.annotation.ControllerAdvice
public class ControllerAdvice extends ResponseEntityExceptionHandler{

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

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<String> handleEmptyInput(NotFoundException notFoundException) {

		return new ResponseEntity<String>("Input Fields are empty, please look into it", HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException exception) {

		return new ResponseEntity<String>("No value present in DB, Please change your request", HttpStatus.NOT_FOUND);
	}
	
	@Override
	protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
			HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		// TODO Auto-generated method stub
	
		//return super.handleHttpRequestMethodNotSupported(ex, headers, status, request);
		return new ResponseEntity<Object>("Please change your method type", HttpStatus.NOT_FOUND);
	
	}
	
}
