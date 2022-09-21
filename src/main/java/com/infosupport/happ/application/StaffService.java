package com.infosupport.happ.application;

import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Staff;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    private final StaffRepository staffRepository;

    public StaffService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
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


}
