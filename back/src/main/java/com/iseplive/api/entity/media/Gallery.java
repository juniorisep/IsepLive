package com.iseplive.api.entity.media;

import com.iseplive.api.constants.MediaType;

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

  @OneToMany
  private List<Image> images;

  @Override
  public void setCreation(Date creation) {
    super.setCreation(creation);
  }

  public List<Image> getImages() {
    return images;
  }

  public void setImages(List<Image> images) {
    this.images = images;
  }

  public String getName() {
    return name;
  }

  public Image getCoverImage() {
    return images.get(0);
  }

  public void setName(String name) {
    this.name = name;
  }
}
