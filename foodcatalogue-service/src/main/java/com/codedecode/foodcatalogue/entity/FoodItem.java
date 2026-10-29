package com.codedecode.foodcatalogue.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class FoodItem implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6023397268550264169L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String itemName;
	private String itemDescription;
	private boolean isVeg;
	@Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
	private Integer restaurantId;
	
	@Column(nullable = false,columnDefinition = "INT DEFAULT 0")
	private Integer quantity;
}
