package com.iseplive.api.controllers;

import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/student/image")
    public void addProfileImage(@RequestParam("image") MultipartFile image) {

    }

    @PostMapping("/student")
    public Student createStudent(@RequestBody StudentDTO dto) {
        return studentService.createStudent(dto);
    }

}
