package com.infosupport.happ.presentation;

import com.infosupport.happ.application.TableService;
import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.TableRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/happ")
public class TableController {
    private final TableService tableService;

    public TableController(TableService tableService) {
        this.tableService = tableService;
    }

    @PostMapping("/table")

    public TableData createTable(@RequestBody TableRequest tableRequest) {
        return tableService.createTable(tableRequest.amountOfPeople, tableRequest.tableNr, tableRequest.tableStatus);
    }

    @GetMapping("/table/{id}")
    public TableData getTable(@PathVariable Long id) {
        try {
            return tableService.createTableData(tableService.getTable(id));
        }catch (ItemNotFound exception){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }
    }

}