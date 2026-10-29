package com.codedecode.userinfo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.codedecode.userinfo.dto.UserDTO;
import com.codedecode.userinfo.entity.User;
import com.codedecode.userinfo.mapper.UserMapper;
import com.codedecode.userinfo.repo.UserRepo;

@Service
public class UserService {

	@Autowired
	UserRepo userRepo;
	
	@Autowired
	UserMapper mapper;
	
	public UserDTO addUser(UserDTO userDTO) {
		User user=mapper.mapUserDTOToUser(userDTO);
		user=userRepo.save(user);
		return mapper.mapUserToUserDTO(user);
	}

	public ResponseEntity<UserDTO> fetchUserDetailsById(Integer userId) {
		Optional<User> fetchedUser=userRepo.findById(userId);
		if(fetchedUser.isPresent()) {
			return new ResponseEntity(mapper.mapUserToUserDTO(fetchedUser.get()),HttpStatus.OK);
		}else {
			return new ResponseEntity(null,HttpStatus.NOT_FOUND);
		}
	}

}
