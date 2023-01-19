package com.test.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "backend_question")
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "question_name")
	private String qname;

	private String optionOne;
	private String optionTwo;
	private String optionThree;
	private String optionFour;

	@Column(name = "question_answer")
	private String answer;

	@ManyToOne
	private Subject sname;

	@ManyToOne
	private Exam ename;

}
