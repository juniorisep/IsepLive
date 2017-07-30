package com.iseplive.api.controllers;

import com.iseplive.api.dto.ClubDTO;
import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.Club;
import com.iseplive.api.services.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@RestController
@RequestMapping("/club")
public class ClubController {

    @Autowired
    ClubService clubService;

    @GetMapping
    public List<Club> listClubs() {
        return clubService.getAll();
    }

    @GetMapping("/{id}")
    public Club getClub(@PathVariable Long id) {
        return clubService.getClub(id);
    }

    @PostMapping
    public Club createClub(@RequestBody ClubDTO clubDTO) {
        return clubService.createClub(clubDTO);
    }

    @PutMapping("/{id}/{state}")
    public void setPublishState(@PathVariable("id") Long id, @PathVariable("state") PublishStateEnum state) {
        clubService.setPublishState(id, state);
    }

    @DeleteMapping("/{id}")
    public void deleteClub(@PathVariable Long id) {
        clubService.deleteClub(id);
    }

}
