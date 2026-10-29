package com.codedecode.foodcatalogue.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Restaurant {

	private int id;
	private String name;
	private String address;
	private String city;
	private String restaurantDescription;
}
