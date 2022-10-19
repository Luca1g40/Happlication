package com.infosupport.happ.security.application;

import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.domain.Staff;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final StaffService staffService;

    public MyUserDetailsService(StaffService staffService) {
        this.staffService = staffService;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String password) throws UsernameNotFoundException {
        Staff staff = staffService.getStaffByPassword(Integer.parseInt(password));
        return new User("staff", String.valueOf(staff.getPassword()), new ArrayList<>());
    }
}

