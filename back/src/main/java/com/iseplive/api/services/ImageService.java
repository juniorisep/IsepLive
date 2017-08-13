package com.iseplive.api.services;

import com.iseplive.api.dao.image.ImageRepository;
import com.iseplive.api.entity.media.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Guillaume on 29/07/2017.
 * back
 */
@Service
public class ImageService {

  @Autowired
  ImageRepository imageRepository;


  public Image getImage(Long id) {
    Image img = imageRepository.findOne(id);
    if (img != null) {
      return img;
    }
    throw new RuntimeException("could not get the image with id: " + id);
  }

  public List<Image> getImages(List<Long> ids) {
    return imageRepository.findImageByIdIn(ids);
  }
}
