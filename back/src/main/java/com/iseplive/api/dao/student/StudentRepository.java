package com.iseplive.api.dao.student;

import com.iseplive.api.entity.user.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
public interface StudentRepository extends CrudRepository<Student, Long> {
  Page<Student> findAll(Pageable pageable);

  @Query("select s from Student s where lower(concat(s.firstname, ' ', s.lastname)) like %?1%")
  Page<Student> searchStudent(String name, Pageable pageable);

  @Query("select s from Student s where lower(concat(s.firstname, ' ', s.lastname)) like %?1% and s.promo in ?2")
  Page<Student> searchStudent(String name, List<Integer> promo, Pageable pageable);

  Student findFirstByStudentId(String studentId);
}
