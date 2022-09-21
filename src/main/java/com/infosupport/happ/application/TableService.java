package com.infosupport.happ.application;


import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.TableStatus;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;

@Service
public class TableService {
    private final TableRepository tableRepository;

    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public TableData createTable(int amountOfPeople, int tableNr, TableStatus tableStatus) {
        Table table = tableRepository.save(new Table(new ArrayList<>(), LocalTime.of(0, 0, 0),
                LocalTime.of(2, 0, 0), amountOfPeople, tableNr, tableStatus));
        return createTableData(table);
    }

    public Table getTable(Long id) {
        tableExists(id);
        return tableRepository.getById(id);
    }

    public TableData createTableData(Table table) {
        return new TableData(table.getAmountOfPeople(),
                table.getTableNumber(),
                table.getElapsedTimeSinceOrder(),
                table.getTimeLeftToOrder(),
                table.getOrders(),
                table.getTableStatus());
    }

    private void tableExists(Long id) {
        if (!tableRepository.existsById(id)) {
            throw new ItemNotFound("table");
        }
    }
}
//TODO Table status is not set
