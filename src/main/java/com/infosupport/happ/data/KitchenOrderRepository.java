package com.infosupport.happ.data;

import com.infosupport.happ.domain.KitchenOrder;
import com.infosupport.happ.domain.PreperationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KitchenOrderRepository extends JpaRepository<KitchenOrder, Long> {
    List<KitchenOrder> getKitchenOrdersByPreperationStatus(PreperationStatus preperationStatus);
}
