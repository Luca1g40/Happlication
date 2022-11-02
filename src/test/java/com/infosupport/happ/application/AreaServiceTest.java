package com.infosupport.happ.application;

import com.infosupport.happ.application.converter.AreaConverter;
import com.infosupport.happ.application.dto.AreaData;
import com.infosupport.happ.data.AreaRepository;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.ShoppingCart;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.Table;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.time.LocalTime;
import java.util.List;

import static com.infosupport.happ.domain.TableStatus.OCCUPIED;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AreaServiceTest {

    private AreaService areaService;
    private StaffRepository staffRepository;

    @BeforeEach
    void beforeEach(){
        AreaConverter areaConverter = new AreaConverter();
        AreaRepository areaRepository = mock(AreaRepository.class);
        this.staffRepository = mock(StaffRepository.class);
        TableRepository tableRepository = mock(TableRepository.class);
        this.areaService = new AreaService(areaRepository, staffRepository, tableRepository, areaConverter);

        Staff staff = new Staff(1, "Staff", new ArrayList<>());
        ShoppingCart shoppingCart = new ShoppingCart();
        Staff staff2 = new Staff(1, "Staff", new ArrayList<>());
        Area area = new Area("Nieuwe area");
        Table table = new Table(LocalTime.now(), LocalTime.now(), 5, 1, OCCUPIED, shoppingCart, false);

        when(areaRepository.existsById(2L)).thenReturn(true);
        when(areaRepository.getById(2L)).thenReturn(area);

        when(staffRepository.existsById(1L)).thenReturn(true);
        when(staffRepository.getById(1L)).thenReturn(staff);

        when(tableRepository.existsById(3L)).thenReturn(true);
        when(tableRepository.getById(3L)).thenReturn(table);

    }

    @Test
    @DisplayName("Area can be created")
    void createArea(){

        AreaData areaData = areaService.createArea("Nieuw area");

        assertNotNull(areaData);

        assertEquals( "Nieuw area", areaData.name);

    }

    @Test
    @DisplayName("Get the correct area")
    void getArea(){

        AreaData area = areaService.getArea(2L);
        assertEquals("Nieuwe area", area.name);

    }

    @Test
    @DisplayName("Add staff to area")
    void addStaff(){

        AreaData areaData = areaService.addStaffToArea(1L, 2L);

        assertEquals(1, areaData.staffWithoutAreasList.size());
        assertThrows(ItemNotFound.class, ()-> areaService.addStaffToArea(1L, 4L));

    }

    @Test
    @DisplayName("Add table to area")
    void addTableToARea(){
        AreaData areaData = areaService.addTableToArea(3L, 2L);

        assertEquals(1, areaData.tables.size());
        assertThrows(ItemNotFound.class, ()-> areaService.addTableToArea(3L, 4L));
    }


    @Test
    @DisplayName("Edit staff of area")
    void editAreaStaff() {
        Staff otherStaff = new Staff(1, "Other staff", new ArrayList<>());
        when(staffRepository.getById(1L)).thenReturn(otherStaff);

        areaService.addStaffToArea(1L, 2L);
        AreaData areaData = areaService.editStaffListInArea(2L, List.of(1L));

        assertEquals("Other staff", areaData.staffWithoutAreasList.get(0).name);
        assertThrows(ItemNotFound.class, () -> areaService.editStaffListInArea(4L, List.of(1L)));

    }

    @Test
    @DisplayName("delete staff of area")
    void deleteAreaStaff(){

        areaService.addStaffToArea(1L, 2L);
        AreaData areaData = areaService.deleteStaffFromArea(1L, 2L);

        assertEquals(0, areaData.staffWithoutAreasList.size());
        assertThrows(ItemNotFound.class, ()-> areaService.deleteStaffFromArea(1L, 4L));

    }

    @Test
    @DisplayName("Area does not exist")
    void areaDoesNotExist(){

        assertThrows(ItemNotFound.class, ()-> areaService.getArea(4L));

    }

}
