package com.infosupport.happ.application;


import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class TableService {
    private final TableRepository tableRepository;

    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public TableData createTable(int amountOfPeople, int tableNr){
        Table table = tableRepository.save(new Table(new ArrayList<>(), new ArrayList<>(), LocalTime.of(0,0,0),
                LocalTime.of(2,0,0), amountOfPeople, tableNr));
        return createTableData(table);
    }

    public Table getTable(Long id){
       if (!tableExists(id)){
           throw new ItemNotFound("table");
       }else return tableRepository.getById(id);
    }

    private TableData createTableData(Table table){
        return new TableData(table.getAmountOfPeople(),
                table.getTableNumber(),
                table.getElapsedTimeSinceOrder(),
                table.getTimeLeftToOrder(),
                table.getOrders());
    }

    private boolean tableExists(Long id){
        return tableRepository.existsById(id);
    }
}
