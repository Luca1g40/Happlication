package com.infosupport.happ.application;

import com.infosupport.happ.application.dto.StaffData;
import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Staff;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class StaffServiceTest {
    private StaffService staffService;
    private StaffRepository staffRepository;
    private AreaService areaService;


    @BeforeEach
    void beforeEach() {
        this.staffRepository = mock(StaffRepository.class);
        this.staffService = new StaffService(staffRepository, areaService);

        Staff staff = new Staff(1234, "Geber");

        when(staffRepository.existsById(1L)).thenReturn(true);
        when(staffRepository.getById(1L)).thenReturn(staff);
    }

    @Test
    @DisplayName("Staff can be created")
    void createStaff() {
        StaffData staffData = staffService.createStaff(111, "new staff");
        assertNotNull(staffData);
        assertEquals(111, staffData.password);
    }

    @Test
    @DisplayName("Get the correct staff")
    void getStaff() {
        Staff staff = staffService.getStaff(1L);
        assertEquals(1234, staff.getPassword());
    }
}
