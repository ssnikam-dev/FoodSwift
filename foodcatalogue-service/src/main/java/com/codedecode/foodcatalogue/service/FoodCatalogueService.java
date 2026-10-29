package com.codedecode.foodcatalogue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.codedecode.foodcatalogue.dto.FoodCataloguePage;
import com.codedecode.foodcatalogue.dto.FoodItemDTO;
import com.codedecode.foodcatalogue.dto.Restaurant;
import com.codedecode.foodcatalogue.entity.FoodItem;
import com.codedecode.foodcatalogue.mapper.FoodItemMapper;
import com.codedecode.foodcatalogue.repo.FoodItemRepo;

@Service
public class FoodCatalogueService {

	@Autowired
	FoodItemMapper mapper;
	@Autowired
	FoodItemRepo foodItemRepo;
	
	@Autowired
	RestTemplate restTemplate;

	public FoodItemDTO addFoodItem(FoodItemDTO foodItemDTO) {
		FoodItem foodItem=mapper.mapFoodItemDTOToFoodItem(foodItemDTO); 
		foodItem=foodItemRepo.save(foodItem);
		return mapper.mapFoodItemToFoodItemDTO(foodItem);
	}

	public FoodCataloguePage fetchFoodCataloguePageDetails(Integer restaurantId) {
		List<FoodItem> foodItemList=fetchFoodItemList(restaurantId);
		Restaurant restaurant=fetchRestaurantDetailsFromRestaurant(restaurantId);
		return createFoodCatalogue(foodItemList,restaurant);
	}

	private FoodCataloguePage createFoodCatalogue(List<FoodItem> foodItemList, Restaurant restaurant) {
		FoodCataloguePage foodCataloguePage=new FoodCataloguePage();
		foodCataloguePage.setFoodItemsList(foodItemList);
		foodCataloguePage.setRestaurant(restaurant);
		return foodCataloguePage;
	}

	private Restaurant fetchRestaurantDetailsFromRestaurant(Integer restaurantId) {
		return restTemplate.getForObject("http://RESTAURANT-SERVICE/restaurant/fetchById/"+restaurantId,Restaurant.class);
	}

	private List<FoodItem> fetchFoodItemList(Integer restaurantId) {
		return foodItemRepo.findByRestaurantId(restaurantId);
	}

}
