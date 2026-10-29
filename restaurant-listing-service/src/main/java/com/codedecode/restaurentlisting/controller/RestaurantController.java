package com.codedecode.restaurentlisting.controller;

import java.util.List;

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

import com.codedecode.restaurentlisting.dto.RestaurantDTO;
import com.codedecode.restaurentlisting.service.RestaurantService;
import com.netflix.discovery.converters.Auto;

@RestController
@RequestMapping(value = "/restaurant")
@CrossOrigin
public class RestaurantController {

	@Autowired
	RestaurantService restaurantService;
	
	@GetMapping("/fetchAllRestaurants")
	public ResponseEntity<RestaurantDTO> fetchAllRestaurants(){
		List<RestaurantDTO> allRestaurants=restaurantService.findAllRestaurants();
		return new ResponseEntity(allRestaurants,HttpStatus.OK);
	}
	
	@PostMapping("/addRestaurant")
	public ResponseEntity<RestaurantDTO> saveRestaurant(@RequestBody RestaurantDTO dto){
		RestaurantDTO restaurantAdded=restaurantService.addRestaurantInDB(dto);
		return new ResponseEntity<>(restaurantAdded,HttpStatus.CREATED);
	}
	@GetMapping("/fetchById/{id}")
	public ResponseEntity<RestaurantDTO> fetchRestaurantById(@PathVariable Integer id){
		return restaurantService.fetchRestaurantById(id);
	}
}
