package com.test.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "backend_subject")
public class Subject {

	@Id
	@Column(name = "subject_name")
	private String name;
}