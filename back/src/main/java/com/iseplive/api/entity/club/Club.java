package com.iseplive.api.entity.club;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iseplive.api.constants.PublishStateEnum;
import com.iseplive.api.entity.user.Author;
import com.iseplive.api.entity.user.Student;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
@DiscriminatorValue("club")
public class Club extends Author {

  private String name;
  private String description;
  private Date creation;
  private String website;

  @JsonIgnore
  @ManyToMany
  private List<ClubMember> members;

  @JsonIgnore
  @Enumerated(EnumType.STRING)
  private PublishStateEnum publishState;

  @JsonIgnore
  @ManyToMany
  private List<Student> admins;

  private String logoUrl;
  private String logoThumbUrl;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Date getCreation() {
    return creation;
  }

  public void setCreation(Date creation) {
    this.creation = creation;
  }

  public String getWebsite() {
    return website;
  }

  public void setWebsite(String website) {
    this.website = website;
  }

  public PublishStateEnum getPublishState() {
    return publishState;
  }

  public void setPublishState(PublishStateEnum publishState) {
    this.publishState = publishState;
  }

  public List<ClubMember> getMembers() {
    return members;
  }

  public void setMembers(List<ClubMember> members) {
    this.members = members;
  }

  public String getLogoUrl() {
    return logoUrl;
  }

  public void setLogoUrl(String logoUrl) {
    this.logoUrl = logoUrl;
  }

  public String getLogoThumbUrl() {
    return logoThumbUrl;
  }

  public void setLogoThumbUrl(String logoThumbUrl) {
    this.logoThumbUrl = logoThumbUrl;
  }

  public List<Student> getAdmins() {
    return admins;
  }

  public void setAdmins(List<Student> admins) {
    this.admins = admins;
  }
}
