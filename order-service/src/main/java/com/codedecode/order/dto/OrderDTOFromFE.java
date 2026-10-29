package com.codedecode.order.dto;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderDTOFromFE {

	private List<FoodItemDTO> foodItemList;
	private Integer userId;
	private Restaurant restaurant;
}
