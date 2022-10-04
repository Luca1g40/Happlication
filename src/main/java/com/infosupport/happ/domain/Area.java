package com.infosupport.happ.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Area {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    @OneToMany
    private List<Table> tables;

    @ManyToMany
    @JoinTable(
            name = "staff_area",
            joinColumns = @JoinColumn(name = "area_id"),
            inverseJoinColumns = @JoinColumn(name = "staff_id"))
    private List<Staff> staffList;

    public Area(String name) {
        this.name = name;
        this.tables = new ArrayList<>();
        this.staffList = new ArrayList<>();
    }

    public Area() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Table> getTables() {
        return tables;
    }

    public List<Staff> getStaffList() {
        return staffList;
    }

    public void addStaff(Staff staff) {
        this.staffList.add(staff);
    }

    public void deleteStaff(Staff staff) {
        this.staffList.remove(staff);
    }

    public void editStaffList(List<Staff> staffList) {
        this.staffList = staffList;
    }
}
