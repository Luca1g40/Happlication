package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.AreaData;
import com.infosupport.happ.application.dto.AreaWithoutStaffData;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.application.dto.StaffWithoutAreasData;
import com.infosupport.happ.data.AreaRepository;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffService {
    private final StaffRepository staffRepository;
    private final AreaRepository areaRepository;

    public StaffService(StaffRepository staffRepository, AreaRepository areaRepository) {
        this.staffRepository = staffRepository;
        this.areaRepository = areaRepository;
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

    public StaffData createStaff(int password, String name) {
        Staff staff = new Staff(password, name, new ArrayList<>(), new ArrayList<>());
        staffRepository.save(staff);
        return createStaffData(staff);
    }

    public StaffData addAreaToStaff(Long areaId, Long staffId) {
        staffExists(staffId);
        Staff staff = staffRepository.getById(staffId);
        Area area = areaRepository.getById(areaId);
        staff.addArea(area);
        area.addStaff(staff); //
        areaRepository.save(area); //
        staffRepository.save(staff);
        return createStaffData(staff);
    }

    public StaffData deleteAreaFromStaff(Long areaId, Long staffId) {
        staffExists(staffId);
        Staff staff = staffRepository.getById(staffId);
        Area area = areaRepository.getById(areaId);
        staff.deleteArea(area);
        area.deleteStaff(staff); //
        areaRepository.save(area); //
        staffRepository.save(staff);
        return createStaffData(staff);
    }

    public StaffData editAreaListInStaff(Long staffId, List<Long> areaIdList) {
        staffExists(staffId);
        List<Area> areaList = new ArrayList<>();
        for (Long id : areaIdList) {
            if (areaRepository.existsById(id)) {
                areaList.add(areaRepository.getById(id));
            } else {
                throw new ItemNotFound(Area.class.getSimpleName());
            }
        }
        Staff staff = staffRepository.getById(staffId);
        staff.editAreaList(areaList);
        staffRepository.save(staff);
        return createStaffData(staff);
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






















