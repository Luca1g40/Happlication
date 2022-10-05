package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.data.AreaRepository;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Area;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
@SpringBootTest
public class StaffServiceTest {
    Staff staff;
    StaffRepository staffRepository;
    AreaRepository areaRepository;
    StaffService staffService;

    @BeforeEach
    void beforeEach(){
        staff = new Staff(123,"Jan");
        staffRepository = mock(StaffRepository.class);
        areaRepository = mock(AreaRepository.class);
        staffService = new StaffService(staffRepository,areaRepository);
        when(staffRepository.getById(1L)).thenReturn(staff);
        when(staffRepository.existsById(1L)).thenReturn(true);

    }

    @Test
    void getStaff(){
        assertEquals(staff,staffService.getStaff(1L));
    }

    @Test
    void createStaff(){
        StaffData staffData = staffService.createStaff(123,"Misher");

        assertNotNull(staffData);

        assertEquals( "Misher", staffData.name);
        assertEquals(123,staffData.password);
    }

    @Test
    void staffExists(){
        assertThrows(ItemNotFound.class, ()-> staffService.getStaff(4L));
    }

//    @Test
//    void addAreaToStaff(){
//        AreaRepository areaRepository = mock(AreaRepository.class);
//        Area area = new Area();
//        when(areaRepository.getById(1L)).thenReturn(area);
//        staffService.addAreaToStaff(1L,1L);
//        assertTrue(staffService.getStaff(1L).getAreas().contains(area));
//    }

}
