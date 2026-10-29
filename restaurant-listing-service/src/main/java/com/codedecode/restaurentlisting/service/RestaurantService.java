package com.codedecode.restaurentlisting.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.codedecode.restaurentlisting.dto.RestaurantDTO;
import com.codedecode.restaurentlisting.entity.Restaurant;
import com.codedecode.restaurentlisting.mapper.RestaurantMapper;
import com.codedecode.restaurentlisting.repo.RestaurantRepo;
import com.netflix.discovery.converters.Auto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Lombok
public class RestaurantService {

	@Autowired
	RestaurantRepo restaurantRepo;
	
	private final RestaurantMapper restaurantMapper; // Injected by Spring

	public List<RestaurantDTO> findAllRestaurants() {
		List<Restaurant> restaurants=restaurantRepo.findAll();
		List<RestaurantDTO> restaurantDTOs=restaurants.stream()
		.map(restaurant->restaurantMapper
				.mapRestaurantToRestaurantDTO(restaurant)).collect(Collectors.toList());
		return restaurantDTOs;
	}

	public RestaurantDTO addRestaurantInDB(RestaurantDTO dto) {
		Restaurant restaurant=restaurantMapper.mapRestuarantDTOToRestaurant(dto);
		restaurant=restaurantRepo.save(restaurant);
		RestaurantDTO  restaurantDTO=restaurantMapper.mapRestaurantToRestaurantDTO(restaurant);
		return restaurantDTO;
	}

	public ResponseEntity<RestaurantDTO> fetchRestaurantById(Integer id) {
		Optional<Restaurant> restaurant=restaurantRepo.findById(id);
		if(restaurant.isPresent()) {
			return new ResponseEntity(restaurantMapper.mapRestaurantToRestaurantDTO(restaurant.get()),
					HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
		}
			
	}
}
