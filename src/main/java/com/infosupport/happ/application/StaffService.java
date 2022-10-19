package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.AreaWithoutStaffData;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final AreaService areaService;

    public StaffService(StaffRepository staffRepository, AreaService areaService) {
        this.staffRepository = staffRepository;
        this.areaService = areaService;
    }

    public Staff getStaff(Long id) {
        staffExists(id);
        return staffRepository.getById(id);
    }

    public List<Table> getTableThatNeedHelp(Long staffId) {
        Staff staff = getStaff(staffId);
        List<Table> tableListWithHelp = new ArrayList<>();
        for (Area area : staff.getAreas()) {
            tableListWithHelp.addAll(areaService.getTablesThatNeedHelp(area.getId()));
        }
        return tableListWithHelp;
    }

    public void staffExists(Long id) {
        if (!staffRepository.existsById(id)) {
            throw new ItemNotFound("staff");
        }
    }

    public StaffData createStaff(int password, String name) {
        Staff staff = new Staff(password, name);
        staffRepository.save(staff);
        return createStaffData(staff);
    }

    public void deleteStaff(Long id) {
        staffExists(id);
        this.staffRepository.deleteById(id);
    }

    public StaffData createStaffData(Staff staff) {
        return new StaffData(
                staff.getId(),
                staff.getPassword(),
                staff.getName(),
                staff.getOperations(),
                staff.getClaimedOrders(),
                createAreaWithoutStaff(staff)
        );
    }

    public List<AreaWithoutStaffData> createAreaWithoutStaff(Staff staff) {
        List<AreaWithoutStaffData> areaWithoutStaffDataList = new ArrayList<>();
        if(staff.getAreas() != null) {
            for (Area area : staff.getAreas()) {
                areaWithoutStaffDataList.add(new AreaWithoutStaffData(
                        area.getId(),
                        area.getName(),
                        area.getTables()
                ));
            }
        }
        return areaWithoutStaffDataList;
    }
}