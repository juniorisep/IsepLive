package com.iseplive.api.entity.club;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

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

  @OneToOne
  private Club club;

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

  @JsonIgnore
  public Club getClub() {
    return club;
  }

  public void setClub(Club club) {
    this.club = club;
  }
}
