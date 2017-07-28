package com.iseplive.api.entity.dor;

import com.iseplive.api.entity.Employee;
import com.iseplive.api.entity.Student;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.util.Date;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Entity
public class VoteDor {

    private Long id;

    @OneToOne
    private Student student;

    @OneToOne
    private Employee employee;

    @OneToOne
    private QuestionDor questionDor;

    private Date date;

}
