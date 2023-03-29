package com.test.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "OAP_question")
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "question_name")
	private String questionName;

	private String optionOne;
	private String optionTwo;
	private String optionThree;
	private String optionFour;

	@Column(name = "question_answer")
	private String answer;

	@ManyToOne
	private Subject subName;

	@ManyToOne
	private Exam examName;
	
	

}
