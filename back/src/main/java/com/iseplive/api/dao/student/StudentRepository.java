package com.iseplive.api.dao.student;

import com.iseplive.api.entity.user.Student;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
public interface StudentRepository extends CrudRepository<Student, Long> {
}
