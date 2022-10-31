package com.infosupport.happ.data;

import com.infosupport.happ.domain.BarOrder;
import com.infosupport.happ.domain.PreperationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BarOrderRepository extends JpaRepository<BarOrder, Long> {
   List<BarOrder> getBarOrdersByPreperationStatus(PreperationStatus preperationStatus);
}
