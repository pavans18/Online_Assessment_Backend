package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.User;
import com.example.security.services.UserDetailsServiceImpl;
import com.example.service.UserServiceImpl;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
public class UsersController {
	@Autowired
	private UserServiceImpl userService;
	
	
	//get all users
    @GetMapping("/allUser")
    
    public ResponseEntity<?> allUsers() {
    	List<User> users = userService.getAllusers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
    
    //student dashboard
    @GetMapping("/student")
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<?> userAccess() {
        return ResponseEntity.status(HttpStatus.OK).body("Student Board.");
    }

    @GetMapping("/instructor")
    @PreAuthorize("hasAuthority('INSTRUCTOR')")
    public ResponseEntity<?> instructorAccess() {
        return ResponseEntity.status(HttpStatus.OK).body("Instructor Board.");
    }
    
    
    @GetMapping("/getUser/{userName}")
    public ResponseEntity<?> getUserByUserName(@PathVariable(name = "userName") String name){
    	
    	User user = userService.getUserByuserName(name);
    	
    	return ResponseEntity.status(HttpStatus.OK).body(user);
    	
    }
    
    //get student by their Email
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email){
    	User user = userService.getUserByEmail(email);
    	return ResponseEntity.status(HttpStatus.OK).body(user);
    }
    
    //to get all students
    @GetMapping("/allStudents")
    public ResponseEntity<?> getAllStudents(){
    	List<User> students = userService.getStudents();
    	return ResponseEntity.status(HttpStatus.OK).body(students);
    }

}
