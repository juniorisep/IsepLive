package com.iseplive.api.conf.jwt;

import java.util.List;

/**
 * Created by Guillaume on 16/10/2017.
 * back
 */
public class AuthUser {
  private Long id;
  private List<String> rights;

  public List<String> getRights() {
    return rights;
  }

  public void setRights(List<String> rights) {
    this.rights = rights;
  }

  public Long getId() {

    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
}
