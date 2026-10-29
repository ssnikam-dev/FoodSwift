package com.codedecode.restaurentlisting.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RestaurantDTO {

	private int id;
	private String name;
	private String address;
	private String city;
	private String restaurantDescription;
}
