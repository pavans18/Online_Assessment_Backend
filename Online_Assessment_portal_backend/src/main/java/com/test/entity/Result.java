package com.test.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "OAP_result")
public class Result {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	
	@Column(name = "result_status")
	private String status;

	@Column(name = "result_score")
	private String score;

	@Column(name = "exam_date")
	private String examDate;

	@Column(name = "total_marks")
	private String totalMarks;

	@Column(name = "total_question")
	private String totalQuestion;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "exam_name")
	private Subject subName;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "username")
	private User username;

	@ManyToOne
	private Exam examId;

}
