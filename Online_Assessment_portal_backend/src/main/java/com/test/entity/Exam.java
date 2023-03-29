package com.test.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Table(name = "OAP_exam")
public class Exam {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@ManyToOne
	private Subject name;

	@Column(name = "exam_desc")
	private String desc;

	@Column(name = "exam_date")
	private String date;

	@Column(name = "exam_marks")
	private String marks;

	@Column(name = "exam_totalQuestion")
	private String totalQuestion;

	@Column(name = "exam_passMarks")
	private String passMarks;

	@Column(name = "exam_level")
	private String level;


}
