package com.codedecode.userinfo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codedecode.userinfo.dto.UserDTO;
import com.codedecode.userinfo.service.UserService;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin
public class UserController {

	@Autowired
	UserService userService;
	
	@PostMapping("/addUser")
	public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO){
		UserDTO savedUser=userService.addUser(userDTO);
		return new ResponseEntity<>(savedUser,HttpStatus.CREATED);
	}
	
	@GetMapping("/fetchUserById/{userId}")
	public ResponseEntity<UserDTO> fetchUserDatabyId(@PathVariable Integer userId){
		return userService.fetchUserDetailsById(userId);
	}
}
