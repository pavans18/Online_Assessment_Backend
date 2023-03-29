package com.test.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.test.entity.Result;
import com.test.exception.ExceptionHandler;
import com.test.exception.NotFoundException;
import com.test.repository.ResultRepository;

@Service
public class ResultServiceImpl implements ResultService {

	@Autowired
	private ResultRepository resultRepo;

	@Override
	public List<Result> showAllResult() {

		try {
			List<Result> allResult = (List<Result>) resultRepo.findAll();
//			if (allResult.isEmpty())
//				throw new ExceptionHandler("No Results are preseent");
			return allResult;
		} catch (Exception e) {
			throw new NotFoundException("Error in Result service layer" + e.getMessage());
		}
	}

	@Override
	public Result addResult(Result result) {
		System.out.println("******Result service is called******");
		System.out.println(result);

		try {
			return resultRepo.save(result);
		} catch (IllegalArgumentException e) {
			throw new NotFoundException("Result fields are empty" + e.getMessage());
		} catch (Exception e) {
			throw new ExceptionHandler("Error in Result Service Layer");
		}
	}

	@Override
	public List<Result> getResultForStudentByName(String userName) {

		try {
			return resultRepo.getResultByUserName(userName);
		} catch (NotFoundException e) {
			throw new NotFoundException("No Result Found for this userName" + e.getMessage());
		} catch (NoSuchElementException e) {
			throw new ExceptionHandler("User name doesn't Exist to get Result" + e.getMessage());
		}
	}

//	@Override
//	public Result addResult(Result result) {
//		return resultRepo.save(result);
//	}

}
