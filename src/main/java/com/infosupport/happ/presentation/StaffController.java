package com.infosupport.happ.presentation;

import com.infosupport.happ.application.OrderService;
import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.StaffRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


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

    //todo --> zijn deze api's wel nodig om changes te brengen in area?
    @PostMapping("/area/{areaid}/staff")
    public StaffData addingAreaToStaff(@PathVariable("areaid") Long areaId, @RequestBody StaffRequest staffRequest) {
        try {
            return this.staffService.addAreaToStaff(areaId, staffRequest.id);
        }catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/area/{areaid}/staff")
    public StaffData deleteAreaFromStaff(@PathVariable("areaid")Long areaId, @RequestBody StaffRequest staffRequest) {
        try{
            return this.staffService.deleteAreaFromStaff(areaId, staffRequest.id);
        }catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/area/{staffid}/staff")
    public StaffData editAreaInStaff(@PathVariable("staffid") Long staffId, @RequestBody StaffRequest staffRequest) {
        return this.staffService.editAreaListInStaff(staffId, staffRequest.areaIdList);
    }


}
