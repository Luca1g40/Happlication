package com.infosupport.happ.data;

import com.infosupport.happ.domain.KitchenOrder;
import com.infosupport.happ.domain.PreperationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface KitchenOrderRepository extends JpaRepository<KitchenOrder, Long> {
    List<KitchenOrder> getKitchenOrdersByPreperationStatus(PreperationStatus preperationStatus);

    @Query(value = "SELECT * FROM kitchen_order where time_of_order BETWEEN :firstDate AND :secondDate", nativeQuery = true)
    List<KitchenOrder> getOrderByDate(@Param("firstDate") LocalDate firstDate, @Param("secondDate") LocalDate secondDate);
}
