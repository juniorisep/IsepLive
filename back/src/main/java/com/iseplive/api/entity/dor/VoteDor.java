package com.iseplive.api.entity.dor;

import com.iseplive.api.entity.user.Employee;
import com.iseplive.api.entity.user.Student;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Entity
public class VoteDor {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @OneToOne
  private SessionDor session;

  @OneToOne
  private Student student;

  @OneToOne
  private Employee employee;

  @OneToOne
  private QuestionDor questionDor;

  private Date date;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Student getStudent() {
    return student;
  }

  public void setStudent(Student student) {
    this.student = student;
  }

  public Employee getEmployee() {
    return employee;
  }

  public void setEmployee(Employee employee) {
    this.employee = employee;
  }

  public QuestionDor getQuestionDor() {
    return questionDor;
  }

  public void setQuestionDor(QuestionDor questionDor) {
    this.questionDor = questionDor;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public SessionDor getSession() {
    return session;
  }

  public void setSession(SessionDor session) {
    this.session = session;
  }
}
