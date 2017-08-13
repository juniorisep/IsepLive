package com.iseplive.api.entity.club;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Entity
public class ClubRole {
  @Id
  @GeneratedValue
  private Long id;
  private String name;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
