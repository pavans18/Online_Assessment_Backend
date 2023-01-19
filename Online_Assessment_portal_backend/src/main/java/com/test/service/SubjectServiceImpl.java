package com.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.test.entity.Subject;
import com.test.repository.SubjectRepository;

@Service
public class SubjectServiceImpl implements SubjectService {

	@Autowired
	private SubjectRepository subrepo;

	@Override
	public List<Subject> showAllSubjects() {
		return (List<Subject>) subrepo.findAll();
	}

	@Override
	public Subject addSubject(Subject subject) {
		return subrepo.save(subject);
	}

	@Override
	public Subject getSubjectByName(String name) {
		return subrepo.getSubjectByName(name);
	}

}
