package com.iseplive.api.services;

import com.iseplive.api.conf.IllegalArgumentException;
import com.iseplive.api.dao.post.AuthorRepository;
import com.iseplive.api.dao.student.StudentFactory;
import com.iseplive.api.dao.student.StudentRepository;
import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.dto.StudentUpdateDTO;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.utils.MediaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

  @Autowired
  MediaUtils imageUtils;

  @Autowired
  StudentFactory studentFactory;

  @Value("${storage.student.url}")
  String studentImageStorage;

  final int RESULTS_PER_PAGE = 50;

  public Page<Student> getAll(int page) {
    return studentRepository.findAll(new PageRequest(page, RESULTS_PER_PAGE));
  }

  public Student getStudent(Long id) {
    Student student = studentRepository.findOne(id);
    if (student != null) {
      return student;
    }
    throw new IllegalArgumentException("could not find the student with id: " + id);
  }

  public Student getStudent(String studentId) {
    return studentRepository.findFirstByStudentId(studentId);
  }

  public Student createStudent(StudentDTO dto) {
    Student student = studentFactory.dtoToEntity(dto);
    return authorRepository.save(student);
  }

  public Student createStudent(Student student) {
    return authorRepository.save(student);
  }

  public void addProfileImage(String studentId, MultipartFile image) {
    Student student = studentRepository.findFirstByStudentId(studentId);
    String path = imageUtils.resolvePath(studentImageStorage, student.getStudentId(), false);
    String pathThumb = imageUtils.resolvePath(studentImageStorage, student.getStudentId(), true);
    imageUtils.saveJPG(image, 512, path);
    imageUtils.saveJPG(image, 128, pathThumb);

    student.setPhotoUrl(imageUtils.getPublicUrlImage(path));
    student.setPhotoUrlThumb(imageUtils.getPublicUrlImage(pathThumb));
    studentRepository.save(student);
  }

  public Page<Student> search(String name, String promos, String sort, int page) {
    Sort.Direction direction = sort.equals("a") ? Sort.Direction.ASC : Sort.Direction.DESC;
    if (!promos.equals("")) {
      List<Integer> promoInt = Arrays.stream(promos.split(","))
        .map(Integer::decode)
        .collect(Collectors.toList());
      return studentRepository.searchStudent(
        name.toLowerCase(),
        promoInt,
        new PageRequest(page, RESULTS_PER_PAGE, direction, "lastname")
      );
    }
    return studentRepository.searchStudent(
      name.toLowerCase(),
      new PageRequest(page, RESULTS_PER_PAGE, direction, "lastname")
    );
  }

  public Student updateStudent(StudentUpdateDTO dto, Long id) {
    Student student = studentRepository.findOne(id);
    studentFactory.updateDtoToEntity(student, dto);
    return studentRepository.save(student);
  }
}
