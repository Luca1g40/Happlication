package com.infosupport.happ.data;

import com.infosupport.happ.domain.Table;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TableRepository extends JpaRepository<Table, Long> {
}
