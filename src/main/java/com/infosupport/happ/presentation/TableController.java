package com.infosupport.happ.presentation;

import com.infosupport.happ.application.TableService;
import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.presentation.dto.TableDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/happ")
public class TableController {
    private TableService tableService;

    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @PostMapping("/table")
    public TableData createTable(@RequestBody TableDTO tableDTO) {
        return tableService.createTable(tableDTO.amountOfPeople, tableDTO.tableNr);
    }

    @GetMapping("/table/{id}")
    public TableData getTable(@PathVariable Long id){
        return tableService.getTable(id);
    }

}