package com.codedecode.order.dto;

import lombok.Data;

@Data
public class FoodItemDTO {

	private int id;
	private String itemName;
	private String itemDescription;
	private boolean isVeg;
	private Number price;
	private Integer restaurantId;
	private Integer quantity;
}
