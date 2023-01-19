package com.test.service;

import java.util.List;

import com.test.entity.Subject;

public interface SubjectService {

	public List<Subject> showAllSubjects();

	public Subject addSubject(Subject subject);

	public Subject getSubjectByName(String name);

}
