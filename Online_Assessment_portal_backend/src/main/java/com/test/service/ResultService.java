package com.test.service;

import java.util.List;

import com.test.entity.Result;

public interface ResultService {

	public List<Result> showAllResult();

	public Result addResult(Result result);

	public List<Result> getResultForStudentByName(String userName);

}
