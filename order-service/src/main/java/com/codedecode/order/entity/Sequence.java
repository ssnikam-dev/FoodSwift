package com.codedecode.order.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection ="sequence")
public class Sequence {

	@Id
	private String id;
	private int sequence;
}
