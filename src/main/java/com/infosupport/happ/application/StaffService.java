package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.data.AreaRepository;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    private final StaffRepository staffRepository;
    private final AreaRepository areaRepository;

    public StaffService(StaffRepository staffRepository, AreaRepository areaRepository) {
        this.staffRepository = staffRepository;
        this.areaRepository = areaRepository;
    }

    public StaffData getStaff(Long id) {
        staffExists(id);
        Staff staff = staffRepository.getById(id);
        return createStaffData(staff);
    }

    public StaffData createStaff(int password, String name) {
        Staff staff = new Staff(password, name);
        staffRepository.save(staff);
        return createStaffData(staff);
    }

//    public StaffData addAreaToStaff(Long areaId, Long staffId) {
//        staffExists(staffId);
//        Staff staff = staffRepository.getById(staffId);
//        Area area = areaRepository.getById(areaId);
//        staff.addArea(area);
//        return createStaffData(staff);
//    }


    public StaffData createStaffData(Staff staff) {
        return new StaffData(
                staff.getId(),
                staff.getPassword(),
                staff.getName(),
                staff.getOperations(),
                staff.getClaimedOrders(),
                staff.getAreas());
    }

    private void staffExists(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new ItemNotFound("staff");
        }
    }

}
