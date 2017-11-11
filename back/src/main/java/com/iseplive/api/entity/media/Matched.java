package com.iseplive.api.entity.media;

import com.iseplive.api.entity.user.Student;

import javax.persistence.*;

/**
 * Created by Guillaume on 02/11/2017.
 * back
 */
@Entity
public class Matched {

  @Id
  @GeneratedValue
  private Long id;

  @OneToOne
  private Student match;

  @OneToOne
  private Student owner;

  public Student getMatch() {
    return match;
  }

  public void setMatch(Student match) {
    this.match = match;
  }

  public Student getOwner() {
    return owner;
  }

  public void setOwner(Student owner) {
    this.owner = owner;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
}
