package com.iseplive.api.controllers;

import com.iseplive.api.dto.ClubDTO;
import com.iseplive.api.dto.view.PostView;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.club.ClubMember;
import com.iseplive.api.entity.club.ClubRole;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.ClubService;
import com.iseplive.api.services.PostService;
import com.iseplive.api.utils.JsonUtils;
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

  @Autowired
  PostService postService;

  @Autowired
  JsonUtils jsonUtils;

  @GetMapping
  public List<Club> listClubs() {
    return clubService.getAll();
  }

  @PostMapping
  public Club createClub(@RequestParam("logo") MultipartFile logo,
                         @RequestParam("club") String club) {
    ClubDTO clubDTO = jsonUtils.deserialize(club, ClubDTO.class);
    return clubService.createClub(clubDTO, logo);
  }

  @PostMapping("/role/{role}")
  public ClubRole createRole(@PathVariable String role) {
    return clubService.createRole(role);
  }

  @PutMapping("/member/{member}/role/{role}")
  public ClubMember updateMemberRole(@PathVariable Long member,
                              @PathVariable Long role) {
    return clubService.updateMemberRole(member, role);
  }

  @DeleteMapping("/member/{member}")
  public void deleteAdmin(@PathVariable Long member) {
    clubService.removeMember(member);
  }

  @PutMapping("/{id}")
  public Club updateClub(@PathVariable Long id,
                         @RequestParam(value = "logo", required = false) MultipartFile logo,
                         @RequestParam("club") String club) {
    ClubDTO clubDTO = jsonUtils.deserialize(club, ClubDTO.class);
    return clubService.updateClub(id, clubDTO, logo);
  }

  @GetMapping("/{id}")
  public Club getClub(@PathVariable Long id) {
    return clubService.getClub(id);
  }

  @DeleteMapping("/{id}")
  public void deleteClub(@PathVariable Long id) {
    clubService.deleteClub(id);
  }

  @PutMapping("/{id}/member/{student}")
  public ClubMember addMember(@PathVariable Long id, @PathVariable Long student) {
    return clubService.addMember(id, student);
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
    return postService.getPostsAuthor(id);
  }
}
