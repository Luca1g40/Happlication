package com.infosupport.happ.presentation;

import com.infosupport.happ.application.AreaService;
import com.infosupport.happ.application.StaffService;
import com.infosupport.happ.application.dto.AreaData;
import com.infosupport.happ.domain.exceptions.ItemNotFound;
import com.infosupport.happ.presentation.dto.AreaRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/happ")
public class AreaController {
    private final AreaService areaService;
    private final StaffService staffService;

    public AreaController(AreaService areaService, StaffService staffService) {
        this.areaService = areaService;
        this.staffService = staffService;
    }

    @PostMapping("/area")
    public AreaData createArea(@RequestBody AreaRequest areaRequest) {
        return areaService.createArea(areaRequest.name);
    }

    @GetMapping("/area/{id}")
    public AreaData getArea(@PathVariable Long id){
        try{
            return this.areaService.createAreaData(areaService.getArea(id));
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/staff/{staffid}/area")
    public AreaData addingStaffToArea(@PathVariable("staffid") Long staffId, @RequestBody AreaRequest areaRequest){
        try {
            return this.areaService.addStaffToArea(staffId, areaRequest.id);
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
