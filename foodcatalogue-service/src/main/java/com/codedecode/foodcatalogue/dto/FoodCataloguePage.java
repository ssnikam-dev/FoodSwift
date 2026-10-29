package com.codedecode.foodcatalogue.dto;

import java.util.List;

import com.codedecode.foodcatalogue.entity.FoodItem;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FoodCataloguePage {

	private List<FoodItem> foodItemsList;
	private Restaurant restaurant;
	
}
