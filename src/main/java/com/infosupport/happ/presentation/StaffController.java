package com.infosupport.happ.presentation;

import com.infosupport.happ.application.OrderService;
import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.exceptions.InvalidValueException;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.OrderRequest;
import com.infosupport.happ.presentation.dto.StaffRequest;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@Transactional
@RequestMapping("/happ")
public class StaffController {

    private final StaffService staffService;
    private final OrderService orderService;

    public StaffController(StaffService staffService, OrderService orderService) {
        this.staffService = staffService;
        this.orderService = orderService;
    }

    @GetMapping("/staff/{staffid}/tablethatneedhelp")
    public List<Table> getTableThatNeedHelp(@PathVariable("staffid") Long staffId) {
        return this.staffService.getTableThatNeedHelp(staffId);
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
        try {
            return this.staffService.createStaff(
                    staffRequest.password,
                    staffRequest.name,
                    staffRequest.rights);
        }catch (InvalidValueException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/staff")
    public StaffData updateStaff(@RequestBody StaffRequest staffRequest) {
        try {
            return this.staffService.updateStaff(
                    staffRequest.password,
                    staffRequest.name,
                    staffRequest.rights
            );
        }catch (InvalidValueException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/staff/{staffId}")
    public StaffData getStaff(@PathVariable Long staffId) {
        try {
            return this.staffService.createStaffData(staffService.getStaff(staffId));
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/staff/{staffId}")
    public void deleteStaff(@PathVariable("staffId") Long staffId) {
        try {
            this.staffService.deleteStaff(staffId);
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/staff/{staffId}/myorders")
    public List<OrderData> getAllClaimedOrders(@PathVariable Long staffId) {
        try {
            return this.staffService.getAllClaimedOrders(staffId);
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/staff/{staffId}/orders")
    public List<OrderData> getAllUnclaimedOrders(@PathVariable Long staffId){
        try {
            return this.staffService.getAllUnclaimedOrders(staffId);
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/staff/findallstaff")
    public List<Staff> getAllStaff() {
            return this.staffService.findAll();
    }
}
