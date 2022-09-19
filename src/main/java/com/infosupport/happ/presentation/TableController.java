package com.infosupport.happ.presentation;

import com.infosupport.happ.application.TableService;
import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.presentation.dto.TableRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/happ")
public class TableController {
    private TableService tableService;

    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @PostMapping("/table")
    public TableData createTable(@RequestBody TableRequest tableDTO) {
        return tableService.createTable(tableDTO.amountOfPeople, tableDTO.tableNr);
    }

    @GetMapping("/table/{id}")
    public TableData getTable(@PathVariable Long id){
        return tableService.createTableData(tableService.getTable(id));
    }

}