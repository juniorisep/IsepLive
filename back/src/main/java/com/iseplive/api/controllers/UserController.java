package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.constants.Roles;
import com.iseplive.api.dto.ImportStudentResult;
import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.dto.StudentUpdateAdminDTO;
import com.iseplive.api.dto.StudentUpdateDTO;
import com.iseplive.api.dto.view.ClubMemberView;
import com.iseplive.api.dto.view.PostView;
import com.iseplive.api.entity.user.Role;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.*;
import com.iseplive.api.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import java.util.List;
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
  AuthService authService;

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
  @RolesAllowed({Roles.STUDENT})
  public Page<PostView> getPostsStudent(@PathVariable Long id, @RequestParam(defaultValue = "0") int page) {
    return postService.getPostsAuthor(id, authService.isUserAnonymous(), page);
  }

  @GetMapping("/student/{id}/club")
  @RolesAllowed({Roles.STUDENT})
  public List<ClubMemberView> getClubsStudent(@PathVariable Long id) {
    return clubService.getStudentClubs(id);
  }

  @GetMapping("/student/{id}")
  @RolesAllowed({Roles.STUDENT})
  public Student getStudent(@PathVariable Long id) {
    return studentService.getStudent(id);
  }

  @GetMapping("/student/{id}/roles")
  @RolesAllowed({Roles.ADMIN, Roles.USER_MANAGER})
  public Set<Role> getStudentRoles(@PathVariable Long id) {
    return studentService.getStudentRoles(id);
  }

  @PostMapping("/student")
  @RolesAllowed({Roles.ADMIN, Roles.USER_MANAGER})
  public Student createStudent(@RequestBody StudentDTO dto) {
    return studentService.createStudent(dto);
  }

  @PutMapping("/student")
  @RolesAllowed({Roles.ADMIN, Roles.USER_MANAGER, Roles.STUDENT})
  public Student updateStudent(@AuthenticationPrincipal TokenPayload auth, @RequestBody StudentUpdateDTO dto) {
    return studentService.updateStudent(dto, auth.getId());
  }

  @PutMapping("/student/admin")
  @RolesAllowed({Roles.ADMIN, Roles.USER_MANAGER})
  public Student updateStudentAdmin(@RequestParam(value = "image", required = false) MultipartFile image,
                                    @RequestParam(value = "form") String form) {
    StudentUpdateAdminDTO dto = jsonUtils.deserialize(form, StudentUpdateAdminDTO.class);
    return studentService.updateStudentAdmin(dto, image);
  }

  @GetMapping("/student/me")
  @RolesAllowed({Roles.STUDENT})
  public Student getLoggedStudent(@AuthenticationPrincipal TokenPayload auth) {
    return studentService.getStudent(auth.getId());
  }

  @PostMapping("/student/import")
  @RolesAllowed({Roles.ADMIN, Roles.USER_MANAGER})
  public ImportStudentResult importStudents(@RequestParam("csv") MultipartFile csv,
                                            @RequestParam("images[]") List<MultipartFile> photos) {
    return studentImportService.importStudents(csv, photos);
  }

  @PutMapping("/student/notification")
  @RolesAllowed({Roles.STUDENT})
  public void toggleNotification(@AuthenticationPrincipal TokenPayload auth) {
    studentService.toggleNotifications(auth);
  }

}
