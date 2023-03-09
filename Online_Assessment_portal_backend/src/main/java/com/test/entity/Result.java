package com.test.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "backend_result")
public class Result {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID")
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

	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "exam_name")
	private Subject sname;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_email")
	private User email;

	@ManyToOne
	private Exam examId;

}
