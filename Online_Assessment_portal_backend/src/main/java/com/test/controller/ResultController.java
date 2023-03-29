package com.test.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.test.entity.Result;
import com.test.entity.User;
import com.test.exception.ExceptionHandler;
import com.test.exception.NotFoundException;
import com.test.exception.QuestionNotFoundException;
import com.test.repository.ResultRepository;
import com.test.service.ResultService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/apiresult")
public class ResultController {

	@Autowired
	private ResultService resultService;

	@Autowired
	private ResultRepository resultRepo;

	// to get all results
	@GetMapping("/showAllResults")
	public ResponseEntity<?> getAllResults() {

		try {
			List<Result> results = resultService.showAllResult();
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (ExceptionHandler e) {
			ExceptionHandler exception = new ExceptionHandler(e.getErrorMessage());
			return new ResponseEntity<String>(exception.getErrorMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// to add result
	@PostMapping("/addResult")
	public ResponseEntity<?> addResult(@RequestBody Result result) {

		try {
			System.out.println("*******");
			System.out.println(result);
			Result resultAdd = resultService.addResult(result);
			System.out.println("successfully posted");
			return ResponseEntity.status(HttpStatus.CREATED).body(resultAdd);

		} catch (ExceptionHandler e) {
			ExceptionHandler exception = new ExceptionHandler(e.getErrorMessage());
			return new ResponseEntity<String>(exception.getErrorMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/studentResult/{userName}")
	public ResponseEntity<?> getResultByUserName(@PathVariable String userName) {

		try {
			List<Result> results = resultService.getResultForStudentByName(userName);
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (Exception e) {
			throw new NotFoundException("Result with username" + userName + "doesn't exist");
		}
	}

	// result based on user email
	@GetMapping("/studentResultByName/{username}/result")
	public ResponseEntity<?> getResultByStudentEmail(@RequestParam("username") String username) {

		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getForEntity("http://localhost:8082/api/user/user/{username}", User.class);
		List<Result> studentResults = resultRepo.findByUsername(username);

		return ResponseEntity.status(HttpStatus.OK).body(studentResults);
	}

}
