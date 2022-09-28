package com.infosupport.happ.presentation;

import com.infosupport.happ.application.TableService;
import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.presentation.dto.ShoppingCartRequest;
import com.infosupport.happ.presentation.dto.TableRequest;
import org.springframework.web.bind.annotation.*;

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
        return tableService.createTableData(tableService.getTable(id));
    }

    @PutMapping("/table/{id}shoppingcart")
    public TableData editShoppingCart(@PathVariable Long id, ShoppingCartRequest shoppingCartRequest){
        return tableService.editShoppingCart(id,shoppingCartRequest.productList);
    }


}