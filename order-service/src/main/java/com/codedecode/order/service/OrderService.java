package com.codedecode.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.codedecode.order.dto.OrderDTO;
import com.codedecode.order.dto.OrderDTOFromFE;
import com.codedecode.order.dto.UserDTO;
import com.codedecode.order.entity.Order;
import com.codedecode.order.mapper.OrderMapper;
import com.codedecode.order.repo.OrderRepo;

@Service
public class OrderService {
	
	@Autowired
	SequenceGenerator sequenceGenerator;
	
	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	OrderRepo orderRepo;
	
	@Autowired
	OrderMapper orderMapper;
	
	public OrderDTO saveOrderInDb(OrderDTOFromFE orderDTOFromFE) {
		Integer newOrderId=sequenceGenerator.generateNextOrderId();
		UserDTO userDTO=fetchUserDetailsFromUser(orderDTOFromFE.getUserId());
		Order orderToBeSaved=new Order(newOrderId,orderDTOFromFE.getFoodItemList(),orderDTOFromFE.getRestaurant(),
				userDTO);
		orderRepo.save(orderToBeSaved);
		return orderMapper.mapOrderToOrderDTO(orderToBeSaved);
	}

	private UserDTO fetchUserDetailsFromUser(Integer userId) {
		return restTemplate.getForObject("http://USER-SERVICE/user/fetchUserById/"+userId,UserDTO.class);
	}


}
