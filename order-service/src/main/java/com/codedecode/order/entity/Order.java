package com.codedecode.order.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.codedecode.order.dto.FoodItemDTO;
import com.codedecode.order.dto.Restaurant;
import com.codedecode.order.dto.UserDTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document("order")
public class Order {

	public Order(Integer newOrderId, List<FoodItemDTO> foodItemList2, Restaurant restaurant2, UserDTO userDTO2) {
		this.orderId=newOrderId;
		this.foodItemList=foodItemList2;
		this.restaurant=restaurant2;
		this.userDTO=userDTO2;
	}
	private Integer orderId;
	private List<FoodItemDTO> foodItemList;
	private Restaurant restaurant;
	private UserDTO userDTO;
}
