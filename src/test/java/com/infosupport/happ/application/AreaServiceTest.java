package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.AreaData;
import com.infosupport.happ.data.AreaRepository;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.data.TableRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class AreaServiceTest {

    private AreaService areaService;
    private AreaRepository areaRepository;
    private StaffRepository staffRepository;
    private TableRepository tableRepository;

    @BeforeEach
    void beforeEach(){
        this.areaRepository = mock(AreaRepository.class);
        this.staffRepository = mock(StaffRepository.class);
        this.areaService = new AreaService(areaRepository, staffRepository, tableRepository);

        Staff staff = new Staff(1, "Staff");
        Area area = new Area("Nieuwe area");

        when(areaRepository.existsById(2L)).thenReturn(true);
        when(areaRepository.getById(2L)).thenReturn(area);

        when(staffRepository.existsById(1L)).thenReturn(true);
        when(staffRepository.getById(1L)).thenReturn(staff);

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
    @DisplayName("Edit staff of area")
    void editAreaStaff(){
        Staff otherStaff = new Staff(1, "Other staff");

        when(staffRepository.getById(1L)).thenReturn(otherStaff);


        areaService.addStaffToArea(1L, 2L);
        AreaData areaData = areaService.editStaffListInArea(2L, List.of(1L));

        assertEquals("Other staff", areaData.staffWithoutAreasList.get(0).name);
        assertThrows(ItemNotFound.class, ()-> areaService.editStaffListInArea(4L, List.of(1L)));

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
