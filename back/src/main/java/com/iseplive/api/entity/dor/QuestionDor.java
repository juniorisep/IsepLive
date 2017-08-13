package com.iseplive.api.entity.dor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Entity
public class QuestionDor {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private Integer position;
  private String title;

  private Boolean enableEvent;
  private Boolean enableClub;
  private Boolean enableStudent;
  private Boolean enableEmployee;
  private Boolean enableParty;
  private Integer promo;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getPosition() {
    return position;
  }

  public void setPosition(Integer position) {
    this.position = position;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Boolean getEnableEvent() {
    return enableEvent;
  }

  public void setEnableEvent(Boolean enableEvent) {
    this.enableEvent = enableEvent;
  }

  public Boolean getEnableClub() {
    return enableClub;
  }

  public void setEnableClub(Boolean enableClub) {
    this.enableClub = enableClub;
  }

  public Boolean getEnableStudent() {
    return enableStudent;
  }

  public void setEnableStudent(Boolean enableStudent) {
    this.enableStudent = enableStudent;
  }

  public Boolean getEnableEmployee() {
    return enableEmployee;
  }

  public void setEnableEmployee(Boolean enableEmployee) {
    this.enableEmployee = enableEmployee;
  }

  public Boolean getEnableParty() {
    return enableParty;
  }

  public void setEnableParty(Boolean enableParty) {
    this.enableParty = enableParty;
  }

  public Integer getPromo() {
    return promo;
  }

  public void setPromo(Integer promo) {
    this.promo = promo;
  }
}
