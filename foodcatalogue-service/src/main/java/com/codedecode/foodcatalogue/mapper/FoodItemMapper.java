package com.codedecode.foodcatalogue.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

import com.codedecode.foodcatalogue.dto.FoodItemDTO;
import com.codedecode.foodcatalogue.entity.FoodItem;

@Mapper(componentModel = "spring")
public interface FoodItemMapper {

	FoodItem mapFoodItemDTOToFoodItem(FoodItemDTO foodItemDTO);
	
	FoodItemDTO mapFoodItemToFoodItemDTO(FoodItem foodItem);
}
