package com.iseplive.api;

import com.iseplive.api.dao.poll.PollRepository;
import com.iseplive.api.dao.post.PostRepository;
import com.iseplive.api.dao.student.StudentRepository;
import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.ClubService;
import com.iseplive.api.services.EventService;
import com.iseplive.api.services.MediaService;
import com.iseplive.api.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DatabaseSeeder {

  @Autowired
  private StudentRepository studentRepository;

  @Autowired
  private StudentService studentService;

  @Autowired
  private ClubService clubService;

  @Autowired
  private EventService eventService;

  @Autowired
  private MediaService mediaService;

  @Autowired
  private PollRepository PollRepository;

  @Autowired
  private PostRepository PostRepository;

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
    StudentDTO studentDTO = new StudentDTO();
    studentDTO.setFirstname("Guillaume");
    studentDTO.setLastname("Carré");
    studentDTO.setBirthDate(new Date());
    studentDTO.setPromo(2018);

    studentService.createStudent(studentDTO);


  }
}
