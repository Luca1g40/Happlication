package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.AreaWithoutStaffData;
import com.infosupport.happ.application.dto.OrderData;
import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.*;
import com.infosupport.happ.domain.exceptions.InvalidValueException;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final OrderService orderService;
    private final AreaService areaService;

    public StaffService(StaffRepository staffRepository, OrderService orderService,  AreaService areaService) {
        this.staffRepository = staffRepository;
        this.orderService = orderService;
        this.areaService = areaService;
    }

    public Staff getStaff(Long id) {
        staffExists(id);
        return staffRepository.getById(id);
    }

    public List<Staff> findAll() {
        return staffRepository.findAll();
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

    public StaffData createStaff(int password, String name, List<Rights> rights) {
        if(name.equals("") || password <= 0){
            throw new InvalidValueException("name or password");
        }
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

    public List<OrderData> getAllUnclaimedOrders(Long staffId){
        staffExists(staffId);
        List<Rights> rights = staffRepository.getById(staffId).getRights();
        List<OrderData> orderData = new ArrayList<>();

        for (Order order: orderService.getAllUnclaimedOrders()) {
            if (order instanceof KitchenOrder && rights.contains(Rights.KITCHEN_RIGHTS)){
                orderData.add(orderService.createOrderData(order));
            }else if (order instanceof BarOrder && rights.contains(Rights.BAR_RIGHTS)){
                orderData.add(orderService.createOrderData(order));
            }
        }

        return orderData;
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

    public StaffData updateStaff(int password, String name, List<Rights> rights) {
        staffExistsByPassword(password);
        Staff staff = staffRepository.getByPassword(password);

        staff.setName(name);
        staff.setPassword(password);
        staff.setRights(rights);

        this.staffRepository.save(staff);

        return createStaffData(staff);
    }
}