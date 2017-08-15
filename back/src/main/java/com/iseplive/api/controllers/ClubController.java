package com.iseplive.api.controllers;

import com.iseplive.api.constants.PublishStateEnum;
import com.iseplive.api.dto.ClubDTO;
import com.iseplive.api.dto.view.PostView;
import com.iseplive.api.entity.Post;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.club.ClubMember;
import com.iseplive.api.entity.club.ClubRole;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.ClubService;
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

  @PostMapping("/role/{role}")
  public ClubRole createRole(@PathVariable String role) {
    return clubService.createRole(role);
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

  @PutMapping("/{id}/member/{role}/{student}")
  public ClubMember addMember(@PathVariable Long id, @PathVariable Long role, @PathVariable Long student) {
    return clubService.addMember(id, role, student);
  }

  @GetMapping("/{id}/admins")
  public List<Student> getAdmins(@PathVariable Long id) {
    return clubService.getAdmins(id);
  }

  @PutMapping("/{id}/admin/{stud}")
  public void addAdmin(@PathVariable Long id, @PathVariable Long stud) {
    clubService.addAdmin(id, stud);
  }

  @DeleteMapping("/{id}/admin/{stud}")
  public void deleteAdmin(@PathVariable Long id, @PathVariable Long stud) {
    clubService.removeAdmin(id, stud);
  }

  @GetMapping("/{id}/member")
  public List<ClubMember> getMembers(@PathVariable Long id) {
    return clubService.getMembers(id);
  }

  @GetMapping("/{id}/post")
  public List<PostView> getPosts(@PathVariable Long id) {
    return clubService.getPosts(id);
  }
}
