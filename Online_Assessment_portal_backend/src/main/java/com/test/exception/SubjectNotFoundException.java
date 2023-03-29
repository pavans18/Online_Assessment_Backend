package com.test.exception;

public class SubjectNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public SubjectNotFoundException() {
	}

	public SubjectNotFoundException(String message) {
		super(message);
	}
}
