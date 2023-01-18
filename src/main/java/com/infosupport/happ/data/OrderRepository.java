package com.infosupport.happ.data;

import com.infosupport.happ.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT * FROM kitchen_order where time_of_order BETWEEN concat('%', :firstDate,'%')  AND '2022-12-21' ", nativeQuery = true)
    List<Order> getOrderByDate(@Param("firstDate") String firstDate);


}
