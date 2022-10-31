package com.infosupport.happ.application;

import com.infosupport.happ.application.converter.AreaConverter;
import com.infosupport.happ.application.dto.AreaData;
import com.infosupport.happ.application.dto.StaffWithoutAreasData;
import com.infosupport.happ.data.AreaRepository;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AreaService {
    private final AreaRepository areaRepository;
    private final StaffRepository staffRepository;
    private final TableRepository tableRepository;
    private final AreaConverter areaConverter;

    public AreaService(AreaRepository areaRepository, StaffRepository staffRepository, TableRepository tableRepository, AreaConverter areaConverter) {
        this.areaRepository = areaRepository;
        this.staffRepository = staffRepository;
        this.tableRepository = tableRepository;
        this.areaConverter = areaConverter;
    }

    public AreaData createArea(String name){
        Area area = new Area(name);
        this.areaRepository.save(area);
        return createAreaData(area);
    }

    public List<Table> getTablesThatNeedHelp(Long areaId) {
        List<Table> tableNeedHelp = new ArrayList<>();
        Area area = areaRepository.getById(areaId);
        for (Table table : area.getTables()) {
            if (table.isHulpNodig()) {
                tableNeedHelp.add(table);
            }
        }
        return tableNeedHelp;
    }

    public AreaData getArea(Long id) {
        areaExists(id);
        Area area = areaRepository.getById(id);
        return createAreaData(area);
    }

    public void deleteArea(Long id) {
        areaExists(id);
        this.areaRepository.deleteById(id);
    }

    public AreaData addStaffToArea(Long staffId, Long areaId){
        areaExists(areaId);
        Staff staff = staffRepository.getById(staffId);
        Area area = areaRepository.getById(areaId);
        area.addStaff(staff);
        areaRepository.save(area);
        return createAreaData(area);
    }

    public AreaData addTableToArea(Long tableId, Long areaId) {
        areaExists(areaId);
        Area area = areaRepository.getById(areaId);
        Table table = tableRepository.getById(tableId);
        area.addTable(table);
        areaRepository.save(area);
        return createAreaData(area);
    }

    public AreaData deleteTableFromArea(Long tabelId, Long areaId) {
        areaExists(areaId);
        Area area = areaRepository.getById(areaId);
        Table table = tableRepository.getById(tabelId);
        area.deleteTable(table);
        areaRepository.save(area);
        return createAreaData(area);
    }

    public AreaData deleteStaffFromArea(Long staffId, Long areaId) {
        areaExists(areaId);
        Staff staff = staffRepository.getById(staffId);
        Area area = areaRepository.getById(areaId);
        area.deleteStaff(staff);
        areaRepository.save(area);
        return createAreaData(area);
    }

    public AreaData editStaffListInArea( Long areaId, List<Long> staffIdList) {
        areaExists(areaId);
        List<Staff> staffList = new ArrayList<>();
        for (Long id : staffIdList) {
            if (staffRepository.existsById(id)) {
                staffList.add(staffRepository.getById(id));
            } else {
                throw new ItemNotFound(Staff.class.getSimpleName());
            }
        }

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
                area.getTables().stream().map(areaConverter::createTableData).collect(Collectors.toList()),
                createStaffWithoutArea(area)
        );
    }

    public List<Area> findAll() {
        return areaRepository.findAll();
    }

    public List<StaffWithoutAreasData> createStaffWithoutArea(Area area) {
        List<StaffWithoutAreasData> staffWithoutAreasList = new ArrayList<>();
        if(area.getStaffList() != null) {
            for (Staff staff : area.getStaffList()) {
                staffWithoutAreasList.add(new StaffWithoutAreasData(
                        staff.getId(),
                        staff.getPassword(),
                        staff.getName(),
                        staff.getOperations(),
                        staff.getClaimedOrders()
                ));
            }
        }
        return staffWithoutAreasList;
    }
}
