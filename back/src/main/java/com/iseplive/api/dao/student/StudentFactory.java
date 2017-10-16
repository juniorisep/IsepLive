package com.iseplive.api.dao.student;

import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.dto.StudentUpdateDTO;
import com.iseplive.api.entity.user.Student;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 16/10/2017.
 * back
 */
@Service
public class StudentFactory {
  public Student dtoToEntity(StudentDTO dto) {
    Student student = new Student();
    student.setBio(dto.getBio());
    student.setBirthDate(dto.getBirthDate());
    student.setFirstname(dto.getFirstname());
    student.setLastname(dto.getLastname());
    student.setPhone(dto.getPhone());
    student.setPromo(dto.getPromo());
    student.setAddress(dto.getAddress());
    student.setMail(dto.getMail());
    student.setMailISEP(dto.getMailISEP());
    return student;
  }

  public Student updateDtoToEntity(StudentUpdateDTO dto) {
    Student student = new Student();
    student.setId(dto.getId());
    student.setBio(dto.getBio());
    student.setBirthDate(dto.getBirthDate());
    student.setPhone(dto.getPhone());
    student.setAddress(dto.getAddress());
    student.setMail(dto.getMail());
    return student;
  }
}
