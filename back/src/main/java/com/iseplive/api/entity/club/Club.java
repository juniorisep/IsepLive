package com.iseplive.api.entity.club;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iseplive.api.entity.Post;
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
  // true if it is iseplive's club.
  private Boolean isAdmin;

  @JsonIgnore
  @ManyToMany(cascade = CascadeType.ALL)
  private List<ClubMember> members;

  @JsonIgnore
  @ManyToMany(fetch = FetchType.EAGER)
  private List<Student> admins;

  @JsonIgnore
  @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Post> posts;

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

  public Boolean getAdmin() {
    return isAdmin;
  }

  public void setAdmin(Boolean admin) {
    isAdmin = admin;
  }

  public List<Post> getPosts() {
    return posts;
  }

  public void setPosts(List<Post> posts) {
    this.posts = posts;
  }
}
