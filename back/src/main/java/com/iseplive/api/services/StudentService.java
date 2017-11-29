package com.iseplive.api.services;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.dao.post.AuthorRepository;
import com.iseplive.api.dao.student.RoleRepository;
import com.iseplive.api.dao.student.StudentFactory;
import com.iseplive.api.dao.student.StudentRepository;
import com.iseplive.api.dto.StudentDTO;
import com.iseplive.api.dto.StudentUpdateDTO;
import com.iseplive.api.entity.user.Role;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.exceptions.IllegalArgumentException;
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

  @Autowired
  RoleRepository roleRepository;

  @Value("${storage.student.url}")
  String studentImageStorage;

  final int RESULTS_PER_PAGE = 20;

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
    imageUtils.saveJPG(image, 384, pathThumb);

    student.setPhotoUrl(imageUtils.getPublicUrlImage(path));
    student.setPhotoUrlThumb(imageUtils.getPublicUrlImage(pathThumb));
    studentRepository.save(student);
  }

  public Page<Student> search(String name, String promos, String sort, int page) {
    Sort.Direction direction = sort.equals("a") ? Sort.Direction.ASC : Sort.Direction.DESC;
    PageRequest pageRequest = new PageRequest(
      page,
      RESULTS_PER_PAGE,
      new Sort(
        new Sort.Order(Sort.Direction.DESC, "promo"),
        new Sort.Order(direction, "lastname")
      )
    );
    if (!promos.equals("")) {
      List<Integer> promoInt = Arrays.stream(promos.split(","))
        .map(Integer::decode)
        .collect(Collectors.toList());
      return studentRepository.searchStudent(
        name.toLowerCase(),
        promoInt,
        pageRequest
      );
    }
    return studentRepository.searchStudent(
      name.toLowerCase(),
      pageRequest
    );
  }

  public Student updateStudent(StudentUpdateDTO dto, Long id) {
    Student student = studentRepository.findOne(id);
    studentFactory.updateDtoToEntity(student, dto);
    return studentRepository.save(student);
  }

  public Role getRole(String role) {
    return roleRepository.findByRole(role);
  }

  public void toggleNotifications(TokenPayload tokenPayload) {
    Student student = getStudent(tokenPayload.getId());
    student.setAllowNotifications(!student.getAllowNotifications());
    studentRepository.save(student);
  }

  public void addRole(Student student, String rolestr) {
    Role role = getRole(rolestr);
    student.getRoles().add(role);
    studentRepository.save(student);
  }


}
