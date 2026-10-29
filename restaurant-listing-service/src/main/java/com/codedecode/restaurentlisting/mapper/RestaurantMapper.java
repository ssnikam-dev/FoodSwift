package com.codedecode.restaurentlisting.mapper;

import org.mapstruct.Mapper;

import com.codedecode.restaurentlisting.dto.RestaurantDTO;
import com.codedecode.restaurentlisting.entity.Restaurant;

@Mapper(componentModel = "spring")
public interface RestaurantMapper {

	
	Restaurant mapRestuarantDTOToRestaurant(RestaurantDTO restaurantDTO);
	
	RestaurantDTO mapRestaurantToRestaurantDTO(Restaurant restaurant);
}
