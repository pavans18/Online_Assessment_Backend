package com.test.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "backend_result")
public class Result {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "result_status")
	private String status;

	@Column(name = "result_score")
	private String score;

	@Column(name = "exam_date")
	private String edate;

	@Column(name = "total_marks")
	private String totalMarks;

	@Column(name = "total_question")
	private String totalQuestion;

	@ManyToOne
	@JoinColumn(name = "_name")
	private Subject sname;

	@ManyToOne
	// @JoinColumn(name= "user_email")
	private User user;

	@ManyToOne
	// @JoinColumn(name= "exam_id")
	private Exam examId;

}
