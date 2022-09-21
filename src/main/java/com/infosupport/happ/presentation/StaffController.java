package com.infosupport.happ.presentation;

import com.infosupport.happ.application.OrderService;
import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.presentation.dto.StaffRequest;
import org.springframework.web.bind.annotation.*;


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
    public StaffData createStaff(@RequestBody StaffRequest staffRequest){
        return this.staffService.createStaff(
                staffRequest.password,
                staffRequest.name);
    }
}
