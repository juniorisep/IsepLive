package com.iseplive.api.entity.dor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Entity
public class QuestionDor {
  @Id
  @GeneratedValue
  private Long id;
  private Integer position;
  private String title;

  private Boolean enableClub;
  private Boolean enableStudent;
  private Boolean enableEmployee;
  private Boolean enableEvent;
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

  public void setPosition(Integer position) {
    this.position = position;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Integer getPromo() {
    return promo;
  }

  public void setPromo(Integer promo) {
    this.promo = promo;
  }

}
