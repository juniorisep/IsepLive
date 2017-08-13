package com.iseplive.api.services;

import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 13/08/2017.
 * back
 */
@Service
public class AuthService {
  @Autowired
  StudentService studentService;

  public boolean isUserAnonymous() {
    return SecurityContextHolder.getContext().getAuthentication()
      .getPrincipal().equals("anonymousUser");
  }

  public Student getLoggedUser() {
    if (!isUserAnonymous()) {
      Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      return studentService.getStudent(id);
    }
    return null;
  }
}
