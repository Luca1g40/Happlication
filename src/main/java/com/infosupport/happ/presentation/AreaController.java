package com.infosupport.happ.presentation;

import com.infosupport.happ.application.AreaService;
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

    public AreaController(AreaService areaService) {
        this.areaService = areaService;
    }

    @PostMapping("/area")
    public AreaData createArea(@RequestBody AreaRequest areaRequest) {
        return areaService.createArea(areaRequest.name);
    }

    @GetMapping("/area/{id}")
    public AreaData getArea(@PathVariable Long id){
        try{
            return this.areaService.getArea(id);
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/staff/{staffid}/area")
    public AreaData adding_staff_to_area(@PathVariable("staffid") Long staffId, @RequestBody AreaRequest areaRequest){
        try {
            return this.areaService.addStaffToArea(staffId, areaRequest.id);
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/staff/{staffid}/area")
    public AreaData deleting_staff_from_area(@PathVariable("staffid") Long staffId, @RequestBody AreaRequest areaRequest) {
        try{
            return this.areaService.deleteStaffFromArea(staffId, areaRequest.id);
        } catch (ItemNotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/area/{id}")
    public void deleteArea(@PathVariable("id") Long id) {
        try {
            this.areaService.deleteArea(id);
        } catch (ItemNotFound itemNotFound) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/staff/{areaid}/area")
    public AreaData editStaffInArea(@PathVariable Long areaid, @RequestBody AreaRequest areaRequest) {
        return areaService.editStaffListInArea(areaid, areaRequest.staffIdList);
    }


}
