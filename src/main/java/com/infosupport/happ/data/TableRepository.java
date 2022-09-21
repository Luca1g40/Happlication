package com.infosupport.happ.data;

import com.infosupport.happ.domain.Table;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TableRepository extends JpaRepository<Table, Long> {
}
