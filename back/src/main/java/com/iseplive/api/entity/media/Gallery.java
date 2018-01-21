package com.iseplive.api.entity.media;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iseplive.api.constants.MediaType;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
@DiscriminatorValue(MediaType.GALLERY)
public class Gallery extends Media {

  private String name;

  @OneToMany(cascade = CascadeType.ALL)
  private List<Image> images;

  @Override
  public void setCreation(Date creation) {
    super.setCreation(creation);
  }

  @JsonIgnore
  public List<Image> getImages() {
    return images;
  }

  public void setImages(List<Image> images) {
    this.images = images;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Image getCoverImage() {
    return images.get(0);
  }

  public List<Image> getPreviewImages() {
    return images.subList(0, images.size() < 10 ? images.size() : 10);
  }
}
