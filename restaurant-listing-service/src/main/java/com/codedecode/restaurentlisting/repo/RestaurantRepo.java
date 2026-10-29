package com.codedecode.restaurentlisting.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codedecode.restaurentlisting.entity.Restaurant;

@Repository
public interface RestaurantRepo extends JpaRepository<Restaurant,Integer>{

}
