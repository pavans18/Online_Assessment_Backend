package com.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.test.entity.Subject;
import com.test.exception.SubjectNotFoundException;
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
		if(subject.getName().equals(" ")) {
			throw new SubjectNotFoundException("Subject Name is Required");
		}
		return subrepo.save(subject);
	}

	@Override
	public Subject getSubjectByName(String name) {
		if(name.equals(" ")) {
			throw new SubjectNotFoundException("Subject Name is Required");
		}
		return subrepo.getSubjectByName(name);
	}

}
