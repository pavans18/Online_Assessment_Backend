package com.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.entity.Result;
import com.test.repository.ResultRepository;

@Service
public class ResultServiceImpl implements ResultService {

	@Autowired
	private ResultRepository resultRepo;

	@Override
	public List<Result> showAllResult() {
		// TODO Auto-generated method stub
		return (List<Result>) resultRepo.findAll();
	}

	@Override
	public Result addResult(Result result) {
		// TODO Auto-generated method stub
		return resultRepo.save(result);
	}

	@Override
	public List<Result> getResultForStudentByName(String userName) {
		// TODO Auto-generated method stub
		return resultRepo.getResultByUserName(userName);
	}

}
