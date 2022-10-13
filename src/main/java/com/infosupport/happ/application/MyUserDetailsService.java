package com.infosupport.happ.application;

import com.infosupport.happ.data.StaffRepository;
import com.infosupport.happ.domain.Staff;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final StaffRepository staffRepository;

    public MyUserDetailsService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Staff staff = staffRepository.getByName(userName);
        return new User(staff.getName(), String.valueOf(staff.getPassword()), new ArrayList<>());
    }
}
