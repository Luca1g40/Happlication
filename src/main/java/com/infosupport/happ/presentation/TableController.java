package com.infosupport.happ.presentation;

import com.infosupport.happ.application.TableService;
import com.infosupport.happ.application.dto.ShoppingCartData;
import com.infosupport.happ.application.dto.TableData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.ProductRequest;
import com.infosupport.happ.presentation.dto.ShoppingCartRequest;
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
        } catch (ItemNotFound exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, exception.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
        }
    }

    @PutMapping("/table/{id}/shoppingcart")
    public TableData editShoppingCart(@PathVariable Long id, @RequestBody ShoppingCartRequest shoppingCartRequest){
        try{
            return tableService.editShoppingCart(id,shoppingCartRequest.productList);
        }catch (ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());

        }
    }

    @PostMapping("/table/{id}/shoppingcart")
    public TableData addToShoppingCart(@PathVariable Long id, @RequestBody ProductRequest productRequest){
        try{
            System.out.println(productRequest.id);
            System.out.println(productRequest.amount);
            return tableService.addToShoppingCart(id,productRequest.id, productRequest.amount);
        }catch(ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
        }
    }

    @PostMapping("/table/{id}/order")
    public TableData placeOrder(@PathVariable Long id){
        try{
            return tableService.placeOrder(id);
        }catch (ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }catch (Exception exception){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage());
        }
    }

    @GetMapping("/table/{id}/shoppingcart")
    public ShoppingCartData getTableShoppingCart(@PathVariable Long id){
        try{
            return tableService.getTableShoppingCart(id);
        }catch (ItemNotFound itemNotFound){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, itemNotFound.getMessage());
        }
    }

    @DeleteMapping("/table/{tableid}")
    private void deleteTable(@PathVariable("tableid") Long tableId) {
        this.tableService.deleteTable(tableId);
    }


}