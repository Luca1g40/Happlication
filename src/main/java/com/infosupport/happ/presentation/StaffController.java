package com.infosupport.happ.presentation;

import com.infosupport.happ.application.OrderService;
import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.OrderRequest;
import com.infosupport.happ.presentation.dto.StaffRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/happ")
public class StaffController {

    private final StaffService staffService;
    private final OrderService orderService;

    public StaffController(StaffService staffService, OrderService orderService) {
        this.staffService = staffService;
        this.orderService = orderService;
    }


    @PostMapping("/order/{orderid}/claim")
    public OrderData claimOrder(@PathVariable("orderid") Long orderId, @RequestBody StaffRequest staffRequest) {

        return this.orderService.claimOrder(staffRequest.id, orderId);

    }

    @PostMapping("/staff/{staffid}/claim")
    public List<OrderData> claimMultipleOrders(@PathVariable("staffid") Long staffId, @RequestBody OrderRequest orderRequest) {

        return this.orderService.claimMultipleOrders(staffId, orderRequest.selectedOrders);

    }

    @PostMapping("/staff")
    public StaffData createStaff(@RequestBody StaffRequest staffRequest) {
        return this.staffService.createStaff(
                staffRequest.password,
                staffRequest.name);
    }

    @GetMapping("/staff/{id}")
    public StaffData getStaff(@PathVariable Long id){
        try{
            return this.staffService.createStaffData(staffService.getStaff(id));
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/staff/{id}")
    public void deleteStaff(@PathVariable("id") Long id) {
        try {
            this.staffService.deleteStaff(id);
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
