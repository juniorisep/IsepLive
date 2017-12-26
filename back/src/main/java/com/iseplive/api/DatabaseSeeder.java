package com.iseplive.api;

import com.google.common.collect.Sets;
import com.iseplive.api.constants.Roles;
import com.iseplive.api.dao.student.RoleRepository;
import com.iseplive.api.dao.student.StudentRepository;
import com.iseplive.api.entity.user.Role;
import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DatabaseSeeder {

  @Autowired
  private StudentRepository studentRepository;

  @Autowired
  private RoleRepository roleRepository;

  public void seedDatabase() {
    if (isDatabaseSeeded()) {
      System.out.println("Database is already seeded. Exiting seeder.");
      return;
    }

    runSeedDatabase();

    System.out.println("Database successfully initialized ! Exiting seeder \uD83D\uDC4D");
  }

  private boolean isDatabaseSeeded() {

    Student user = studentRepository.findOne(1L);
    // if it's found, the database is already seeded

    return user != null;

  }

  private void runSeedDatabase() {
    // TODO
    Student student = new Student();
    student.setFirstname("Default");
    student.setLastname("Admin");
    student.setBirthDate(new Date());

    Role roleStudent = roleRepository.findByRole(Roles.STUDENT);
    Role roleAdmin = roleRepository.findByRole(Roles.ADMIN);
    student.setRoles(Sets.newHashSet(roleStudent, roleAdmin));

    studentRepository.save(student);
  }
}
