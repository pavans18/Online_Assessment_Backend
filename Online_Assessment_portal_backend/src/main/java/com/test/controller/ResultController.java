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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import com.test.entity.Result;
import com.test.repository.ResultRepository;
import com.test.service.ResultService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/apiresult")
public class ResultController {

	@Autowired
	private ResultService resultService;
	

	//to get all results
	@GetMapping("/showAllResults")
	public ResponseEntity<?> getAllResults(){
		List<Result> results = resultService.showAllResult();
		return ResponseEntity.status(HttpStatus.OK).body(results);
	}
	
	//to add result 
	@PostMapping("/addResult")
	public ResponseEntity<?> addResult( @RequestBody Result result){
		Result resultAdd = resultService.addResult(result);
		return ResponseEntity.status(HttpStatus.CREATED).body(resultAdd);
	}
	
	
	@GetMapping("/studentResult/{userName}")
	public ResponseEntity<?> getResultByUserName(@PathVariable String userName){
		List<Result> results = resultService.getResultForStudentByName(userName);
		return ResponseEntity.status(HttpStatus.OK).body(results);
	}
	
	//getresult based on user email
//	@GetMapping("/studentResult/{email}/result")
//	public ResponseEntity<?> getResultByStudentEmail(@PathVariable("email") String email){
//		
//		RestTemplate restTemplate = new RestTemplate();
//		restTemplate.getForEntity("http://localhost:8082//user/{email}", User.class);
//		List<Result> studentResults = resultRepo.findByEmail(email);
//		
//		return ResponseEntity.status(HttpStatus.OK).body(studentResults);
// 	}
	
}
