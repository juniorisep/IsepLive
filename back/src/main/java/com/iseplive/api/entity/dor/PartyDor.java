package com.iseplive.api.entity.dor;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Guillaume on 09/02/2018.
 * back
 */
public class PartyDor {
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
