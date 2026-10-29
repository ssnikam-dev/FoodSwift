package com.codedecode.userinfo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codedecode.userinfo.entity.User;

public interface UserRepo extends JpaRepository<User,Integer>{

}
