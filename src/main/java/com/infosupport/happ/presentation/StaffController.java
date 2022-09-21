package com.infosupport.happ.presentation;

import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.presentation.dto.StaffRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/happ")
public class StaffController {
    private final StaffService staffService;


    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }


    @PostMapping("/staff")
    public StaffData createStaff(@RequestBody StaffRequest staffRequest){
        staffService.createStaff(staffRequest.password,staffRequest.name);
        return staffService.createStaff(staffRequest.password,staffRequest.name);
    }
}
