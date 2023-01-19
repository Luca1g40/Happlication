package com.infosupport.happ.data;

import com.infosupport.happ.domain.BarOrder;
import com.infosupport.happ.domain.KitchenOrder;
import com.infosupport.happ.domain.PreperationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BarOrderRepository extends JpaRepository<BarOrder, Long> {
    List<BarOrder> getBarOrdersByPreperationStatus(PreperationStatus preperationStatus);

    @Query(value = "SELECT * FROM bar_order where time_of_order BETWEEN :firstDate AND :secondDate", nativeQuery = true)
    List<BarOrder> getOrderByDate(@Param("firstDate") LocalDate firstDate, @Param("secondDate") LocalDate secondDate);
}
