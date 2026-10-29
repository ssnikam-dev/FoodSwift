package com.codedecode.userinfo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {

	private int userId;
	private String userName;
	private String userPassword;
	private String address;
	private String city;
}
