package com.test.exception;

public class ExamNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ExamNotFoundException() {
	}

	public ExamNotFoundException(String message) {
		super(message);
	}
}
