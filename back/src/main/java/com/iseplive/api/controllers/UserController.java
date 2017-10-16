package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.AuthUser;
import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.dto.StudentUpdateDTO;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Guillaume on 29/07/2017.
 * back
 */
@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  StudentService studentService;

  @GetMapping("/student")
  public Page<Student> getAll(@RequestParam(defaultValue = "0") int page) {
    return studentService.getAll(page);
  }

  @GetMapping("/student/search")
  public Page<Student> searchStudents(String name, @RequestParam(defaultValue = "0") int page) {
    return studentService.search(name, page);
  }

  @PostMapping("/student/{id}/image")
  public void addProfileImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) {
    studentService.addProfileImage(id, image);
  }

  @GetMapping("/student/{id}")
  public Student getStudent(@PathVariable Long id) {
    return studentService.getStudent(id);
  }

  @PostMapping("/student")
  public Student createStudent(@RequestBody StudentDTO dto) {
    return studentService.createStudent(dto);
  }

  @PutMapping("/student")
  public Student updateStudent(@AuthenticationPrincipal AuthUser auth, @RequestBody StudentUpdateDTO dto) {
    return studentService.updateStudent(dto, auth.getId());
  }

  @GetMapping("/student/me")
  public Student getLoggedStudent(@AuthenticationPrincipal AuthUser auth) {
    return studentService.getStudent(auth.getId());
  }

}
