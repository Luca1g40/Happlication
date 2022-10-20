package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.AreaWithoutStaffData;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Order;
import com.infosupport.happ.domain.Rights;
import com.infosupport.happ.domain.Rights;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final OrderService orderService;

    public StaffService(StaffRepository staffRepository, OrderService orderService) {
        this.staffRepository = staffRepository;
        this.orderService = orderService;
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

    public StaffData createStaff(int password, String name, List<Rights> rights) {
        Staff staff = new Staff(password, name, rights);
        staffRepository.save(staff);
        return createStaffData(staff);
    }

    public Staff getStaffByPassword(int password) {
        staffExistsByPassword(password);
        return staffRepository.getByPassword(password);
    }

    public void staffExistsByPassword(int password) {
        if (!staffRepository.existsByPassword(password)) {
            throw new ItemNotFound("staff");
        }
    }

    public void deleteStaff(Long id) {
        staffExists(id);
        this.staffRepository.deleteById(id);
    }

    public List<OrderData> getAllClaimedOrders(Long staffId) {
        Staff staff = getStaff(staffId);

        List<Order> claimedOrders = staff.getClaimedOrders();

        return orderService.convertToOrderDataList(claimedOrders);
    }


    public StaffData createStaffData(Staff staff) {
        return new StaffData(
                staff.getId(),
                staff.getName(),
                staff.getOperations(),
                staff.getClaimedOrders(),
                createAreaWithoutStaff(staff),
                staff.getRights());
    }

    public List<AreaWithoutStaffData> createAreaWithoutStaff(Staff staff) {
        List<AreaWithoutStaffData> areaWithoutStaffDataList = new ArrayList<>();
        if (staff.getAreas() != null) {
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