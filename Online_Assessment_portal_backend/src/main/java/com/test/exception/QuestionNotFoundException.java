package com.test.exception;

public class QuestionNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public QuestionNotFoundException() {}

	public QuestionNotFoundException(String message) {
		super(message);
	}

}
