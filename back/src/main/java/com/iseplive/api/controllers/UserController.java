package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.dto.StudentUpdateAdminDTO;
import com.iseplive.api.dto.StudentUpdateDTO;
import com.iseplive.api.dto.view.ClubMemberView;
import com.iseplive.api.dto.view.PostView;
import com.iseplive.api.entity.club.ClubMember;
import com.iseplive.api.entity.user.Role;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.ClubService;
import com.iseplive.api.services.PostService;
import com.iseplive.api.services.StudentImportService;
import com.iseplive.api.services.StudentService;
import com.iseplive.api.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by Guillaume on 29/07/2017.
 * back
 */
@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  StudentService studentService;

  @Autowired
  PostService postService;

  @Autowired
  ClubService clubService;

  @Autowired
  StudentImportService studentImportService;

  @Autowired
  JsonUtils jsonUtils;

  @GetMapping("/student")
  public Page<Student> getAllStudents(@RequestParam(defaultValue = "0") int page) {
    return studentService.getAll(page);
  }

  @GetMapping("/student/search")
  public Page<Student> searchStudents(String name, String promos, String sort,
                                      @RequestParam(defaultValue = "0") int page) {
    return studentService.search(name, promos, sort, page);
  }

  @GetMapping("/student/{id}/post")
  public List<PostView> getPostsStudent(@PathVariable Long id) {
    return postService.getPostsAuthor(id);
  }

  @GetMapping("/student/{id}/club")
  public List<ClubMemberView> getClubsStudent(@PathVariable Long id) {
    return clubService.getStudentClubs(id);
  }

  @GetMapping("/student/{id}")
  public Student getStudent(@PathVariable Long id) {
    return studentService.getStudent(id);
  }

  @GetMapping("/student/{id}/roles")
  public Set<Role> getStudentRoles(@PathVariable Long id) {
    return studentService.getStudentRoles(id);
  }

  @PostMapping("/student")
  public Student createStudent(@RequestBody StudentDTO dto) {
    return studentService.createStudent(dto);
  }

  @PutMapping("/student")
  public Student updateStudent(@AuthenticationPrincipal TokenPayload auth, @RequestBody StudentUpdateDTO dto) {
    return studentService.updateStudent(dto, auth.getId());
  }

  @PutMapping("/student/admin")
  public Student updateStudentAdmin(@RequestParam(value = "image", required = false) MultipartFile image,
                                    @RequestParam(value = "form") String form) {
    StudentUpdateAdminDTO dto = jsonUtils.deserialize(form, StudentUpdateAdminDTO.class);
    return studentService.updateStudentAdmin(dto, image);
  }

  @GetMapping("/student/me")
  public Student getLoggedStudent(@AuthenticationPrincipal TokenPayload auth) {
    return studentService.getStudent(auth.getId());
  }

  @PostMapping("/student/import")
  public Map<String, Student> importStudents(@RequestParam("csv") MultipartFile csv,
                                             @RequestParam("images[]") List<MultipartFile> photos) {
    return studentImportService.importStudents(csv, photos);
  }

  @PutMapping("/student/notification")
  public void toggleNotification(@AuthenticationPrincipal TokenPayload auth) {
    studentService.toggleNotifications(auth);
  }

}
