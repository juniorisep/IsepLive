package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.JwtAuthRequest;
import com.iseplive.api.conf.jwt.JwtTokenUtil;
import com.iseplive.api.conf.jwt.TokenSet;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.exceptions.AuthException;
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
  public TokenSet getToken(@RequestBody JwtAuthRequest authRequest) {
    // TODO: replace with correct auth, currently only for testing
    Student student = studentService.getStudent(authRequest.getUsername());
    if (student == null) {
      return jwtTokenUtil.generateToken(studentService.getStudent(1L));
    }
    if (authRequest.getPassword() != null) {
      return jwtTokenUtil.generateToken(student);
    }
    throw new AuthException("User not found");
  }
}
