package com.codedecode.foodcatalogue.dto;

import java.math.BigDecimal;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FoodItemDTO {

	private int id;
	private String itemName;
	private String itemDescription;
	private boolean isVeg;
	private BigDecimal price;
	private Integer restaurantId;
	private Integer quantity;
}
