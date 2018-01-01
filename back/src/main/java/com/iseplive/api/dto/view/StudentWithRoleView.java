package com.iseplive.api.dto.view;

import com.iseplive.api.dto.StudentUpdateAdminDTO;

import java.util.List;

/**
 * Created by Guillaume on 01/01/2018.
 * back
 */
public class StudentWithRoleView extends StudentUpdateAdminDTO {

  private String studentId;

  private String photoUrl;
  private String photoUrlThumb;

  private List<String> rolesValues;

  public String getStudentId() {
    return studentId;
  }

  public void setStudentId(String studentId) {
    this.studentId = studentId;
  }


  public String getPhotoUrl() {
    return photoUrl;
  }

  public void setPhotoUrl(String photoUrl) {
    this.photoUrl = photoUrl;
  }

  public String getPhotoUrlThumb() {
    return photoUrlThumb;
  }

  public void setPhotoUrlThumb(String photoUrlThumb) {
    this.photoUrlThumb = photoUrlThumb;
  }

  public List<String> getRolesValues() {
    return rolesValues;
  }

  public void setRolesValues(List<String> rolesValues) {
    this.rolesValues = rolesValues;
  }
}
