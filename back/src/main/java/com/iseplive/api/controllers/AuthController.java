package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.JwtAuthRequest;
import com.iseplive.api.conf.jwt.JwtTokenUtil;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Guillaume on 07/08/2017.
 * back
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    StudentService studentService;

    @PostMapping
    public String getToken(@RequestBody JwtAuthRequest authRequest) {
        Student student = studentService.getStudent(1L);
        return jwtTokenUtil.generateToken(student);
    }
}
