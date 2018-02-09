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
  @GeneratedValue
  private Long id;

  private boolean secondTurn;

  @ManyToOne
  private SessionDor session;

  @ManyToOne
  private Student student;

  @ManyToOne
  private Employee employee;

  @ManyToOne
  private EventDor event;

  @ManyToOne
  private PartyDor partyDor;

  @ManyToOne
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

  public PartyDor getPartyDor() {
    return partyDor;
  }

  public void setPartyDor(PartyDor partyDor) {
    this.partyDor = partyDor;
  }

  public EventDor getEvent() {
    return event;
  }

  public void setEvent(EventDor event) {
    this.event = event;
  }

  public boolean isSecondTurn() {
    return secondTurn;
  }

  public void setSecondTurn(boolean secondTurn) {
    this.secondTurn = secondTurn;
  }
}
