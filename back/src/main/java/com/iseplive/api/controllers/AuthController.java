package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.JwtAuthRequest;
import com.iseplive.api.conf.jwt.JwtTokenUtil;
import com.iseplive.api.conf.jwt.TokenSet;
import com.iseplive.api.dto.LDAPUserDTO;
import com.iseplive.api.entity.user.Role;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.exceptions.AuthException;
import com.iseplive.api.services.LDAPService;
import com.iseplive.api.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  @Autowired
  LDAPService ldapService;

  @PostMapping
  public TokenSet getToken(@RequestBody JwtAuthRequest authRequest) {
    // TODO: replace with correct auth, currently only for testing
    Student student = studentService.getStudent(authRequest.getUsername());

    if (authRequest.getUsername().equals("")) {
      return jwtTokenUtil.generateToken(studentService.getStudent(1L));
    }

    // TODO: WIP auth
    LDAPUserDTO user = ldapService.retrieveUser(authRequest.getUsername(), authRequest.getPassword());
    if (user != null) {
      Student ldapStudent = studentService.getStudent(user.getEmployeeNumber());
      return jwtTokenUtil.generateToken(ldapStudent);
    }

    if (!authRequest.getPassword().isEmpty()) {
      return jwtTokenUtil.generateToken(student);
    }

    throw new AuthException("User not found");
  }

  @GetMapping("/roles")
  public List<Role> getRoles() {
    return studentService.getRoles();
  }

}
