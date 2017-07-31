package com.iseplive.api.services;

import com.iseplive.api.dao.student.StudentRepository;
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
    StudentRepository studentRepository;

    public Student getStudent(Long id) {
        Student student = studentRepository.findOne(id);
        if (student != null) {
            return student;
        }
        throw new RuntimeException("could not find the student with id: "+id);
    }

}
