package com.iseplive.api.services;

import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Guillaume on 22/10/2017.
 * back
 */
@Service
public class StudentImportService {

  private final String CSV_SEPARATOR = ",";

  private final int CSV_NUM_COLUMNS = 3;

  @Autowired
  StudentService studentService;

  public Map<String, Student> importStudents(MultipartFile csv, List<MultipartFile> photos) {

    // Map of studentID : Student
    Map<String, Student> students = new HashMap<>();
    try {
      String line;
      InputStream is = csv.getInputStream();
      BufferedReader br = new BufferedReader(new InputStreamReader(is));
      int lineNum = 0;
      while ((line = br.readLine()) != null) {
        String[] cols = line.split(CSV_SEPARATOR);
        if (lineNum != 0 && cols.length == CSV_NUM_COLUMNS) {
          String firstname = cols[0];
          String lastname = cols[1];
          String studentId = cols[2];

          Student student = new Student();
          student.setFirstname(firstname);
          student.setLastname(lastname);
          student.setStudentId(studentId);

          students.put(studentId, student);
        }

        lineNum++;
      }

      for (MultipartFile photo: photos) {
        String fullname = photo.getOriginalFilename();
        String name = fullname.split("\\.")[0];
        if (students.get(name) != null) {
          studentService.createStudent(students.get(name));
          studentService.addProfileImage(name, photo);
          students.remove(name);
        }
      }

      return students;


    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

}
