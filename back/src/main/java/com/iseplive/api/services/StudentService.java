package com.iseplive.api.services;

import com.iseplive.api.dao.post.AuthorRepository;
import com.iseplive.api.dao.student.StudentRepository;
import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Service
public class StudentService {

    @Autowired
    AuthorRepository authorRepository;

    @Autowired
    StudentRepository studentRepository;

    public Student getStudent(Long id) {
        Student student = studentRepository.findOne(id);
        if (student != null) {
            return student;
        }
        throw new RuntimeException("could not find the student with id: "+id);
    }

    public Student createStudent(StudentDTO dto) {
        Student student = new Student();
        student.setBio(dto.getBio());
        student.setBirthDate(dto.getBirthDate());
        student.setFirstname(dto.getFirstname());
        student.setLastname(dto.getLastname());
        student.setPhone(dto.getPhone());
        student.setPromo(dto.getPromo());
        return authorRepository.save(student);
    }
}
