package com.codedecode.userinfo.mapper;

import org.mapstruct.Mapper;

import com.codedecode.userinfo.dto.UserDTO;
import com.codedecode.userinfo.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

	User mapUserDTOToUser(UserDTO userDTO);
	
	UserDTO mapUserToUserDTO(User user);
}
