package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class StaffService {
    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    public Staff getStaff(Long id) {
        staffExists(id);
        return staffRepository.getById(id);
    }

    public void staffExists(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new ItemNotFound("staff");
        }
    }

    public StaffData createStaff(int password, String name){
        System.out.println("voor cereate");
        Staff staff = new Staff(password,name,new ArrayList<>(),new ArrayList<>(),new ArrayList<>());
        System.out.println("na create");
        staffRepository.save(staff);
        System.out.println("??????");
        return createStaffData(staff);
    }


    public StaffData createStaffData(Staff staff){
        return new StaffData(
                staff.getId(),
                staff.getPassword(),
                staff.getName(),
                staff.getOperations(),
                staff.getClaimedOrders(),
                staff.getArea());
    }

}
