package com.iseplive.api.controllers;

import com.iseplive.api.dto.ClubDTO;
import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.club.ClubMember;
import com.iseplive.api.entity.media.Image;
import com.iseplive.api.services.ClubService;
import com.iseplive.api.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping
    public Club createClub(@RequestBody ClubDTO clubDTO) {
        return clubService.createClub(clubDTO);
    }

    @GetMapping("/{id}")
    public Club getClub(@PathVariable Long id) {
        return clubService.getClub(id);
    }

    @DeleteMapping("/{id}")
    public void deleteClub(@PathVariable Long id) {
        clubService.deleteClub(id);
    }

    @PutMapping("/{id}/logo")
    public Club setLogo(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        return clubService.setClubLogo(file, id);
    }

    @PutMapping("/{id}/state/{state}")
    public void setPublishState(@PathVariable("id") Long id, @PathVariable("state") PublishStateEnum state) {
        clubService.setPublishState(id, state);
    }

    @PutMapping("/{id}/member/{role}/{student}")
    public ClubMember addMember(@PathVariable Long id, @PathVariable Long role, @PathVariable Long student) {
        return clubService.addMember(id, role, student);
    }


}
