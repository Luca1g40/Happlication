package com.infosupport.happ.presentation;

import com.infosupport.happ.application.AreaService;
import com.infosupport.happ.application.dto.AreaData;
import com.infosupport.happ.presentation.dto.AreaRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
