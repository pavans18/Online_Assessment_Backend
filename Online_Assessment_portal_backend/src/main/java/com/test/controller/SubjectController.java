package com.test.controller;

import java.util.List;

import org.aspectj.lang.NoAspectBoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.entity.Subject;
import com.test.exception.NotFoundException;
import com.test.repository.SubjectRepository;
import com.test.service.SubjectService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/apisubjects")
public class SubjectController {

	@Autowired
	private SubjectService subjectService;

	@Autowired
	private SubjectRepository subjectRepository;

	// to get all subjects
	@GetMapping("/showSubjects")
	public ResponseEntity<?> showAllSubjects() {
		List<Subject> subjects = subjectService.showAllSubjects();
		return ResponseEntity.status(HttpStatus.OK).body(subjects);
	}

	// to get subject by subName
	@GetMapping("/getSubject/{subjectName}")
	public ResponseEntity<?> showSubjectByName(@PathVariable(name = "subjectName") String name) {
		Subject showsubject = subjectService.getSubjectByName(name);
		return ResponseEntity.status(HttpStatus.OK).body(showsubject);
	}

	// to delete subject by subName
	@DeleteMapping("/subjectByName/{subName}")
	public String deleteSubject(@PathVariable("subName") String name) {
	
		int row = this.subjectRepository.deleteByName(name);
		return row + "row get deleted";
	}

	// Add Subject
	@PostMapping("/addSubject")
	public ResponseEntity<?> addNewSubject(@RequestBody Subject subject) {
		if(subject.getName().equals("")) {
			throw new NotFoundException("Subject Name is Required");
		}
		Subject addSubject = subjectService.addSubject(subject);
		return ResponseEntity.status(HttpStatus.CREATED).body(addSubject);

	}
}
