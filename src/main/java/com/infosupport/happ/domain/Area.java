package com.infosupport.happ.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Area {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    @OneToMany
    private List<Table> tables;
    @OneToMany
    private List<Staff> staffList;

    public Area(String name, List<Table> tables, List<Staff> staffList) {
        this.name = name;
        this.tables = tables;
        this.staffList = staffList;
    }

    public Area() {
    }
}
