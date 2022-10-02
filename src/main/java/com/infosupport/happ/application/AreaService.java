package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.AreaData;
import com.infosupport.happ.data.AreaRepository;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AreaService {
    private final AreaRepository areaRepository;
    private final StaffRepository staffRepository;

    public AreaService(AreaRepository areaRepository, StaffRepository staffRepository) {
        this.areaRepository = areaRepository;
        this.staffRepository = staffRepository;
    }

//    public AreaData createArea(String name, List<Table> tableList, List<Staff> staffList){
//        Area area = this.areaRepository.save(new Area(name, tableList, staffList));
//        return createAreaData(area);
//    }

    public AreaData createArea(String name){
        Area area = this.areaRepository.save(new Area(name, new ArrayList<>(), new ArrayList<>()));
        return createAreaData(area);
    }

    public AreaData addStaffToArea(Long staffId, Long areaId){
        areaExists(areaId);
        Staff staff = staffRepository.getById(staffId);
        Area area = areaRepository.getById(areaId);
        area.addStaff(staff);
        areaRepository.save(area);
        return createAreaData(area);
    }

    public AreaData deleteStaffFromArea(Long staffId, Long areaId) {
        areaExists(areaId);
        Staff staff = staffRepository.getById(staffId);
        Area area = areaRepository.getById(areaId);
        area.deleteStaff(staff);
        areaRepository.delete(area);
        return createAreaData(area);
    }

    public AreaData editStaffListInArea(List<Staff> staffList, Long areaId) {
        areaExists(areaId);
        Area area = areaRepository.getById(areaId);
        area.editStaffList(staffList);
        areaRepository.save(area);
        return createAreaData(area);
    }

    private void areaExists(Long id) {
        if (!areaRepository.existsById(id)) {
            throw new ItemNotFound("area");
        }
    }

    public AreaData createAreaData(Area area) {
        return new AreaData(
                area.getName(),
                area.getTables(),
                area.getStaffList()
        );
    }

}