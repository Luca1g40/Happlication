package com.infosupport.happ.data;

import com.infosupport.happ.domain.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationRepository extends JpaRepository<Operation, Long> {
}
