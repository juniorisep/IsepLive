package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.JwtAuthenticationToken;
import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.ClubService;
import com.iseplive.api.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    ClubService clubService;

    @GetMapping("/student")
    public List<Student> getAll() {
        return studentService.getAll();
    }

    @PostMapping("/student/{id}/image")
    public void addProfileImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) {
        studentService.addProfileImage(id, image);
    }

    @PostMapping("/student")
    public Student createStudent(@RequestBody StudentDTO dto) {
        return studentService.createStudent(dto);
    }

    @GetMapping("/student/clubs/admin")
    public List<Club> getClubAuthors(@AuthenticationPrincipal Long studentId) {
        return clubService.getClubAuthors(studentId);
    }

}
