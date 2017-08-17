package com.iseplive.api.controllers.media;

import com.iseplive.api.conf.NotFoundException;
import com.iseplive.api.entity.media.*;
import com.iseplive.api.services.MediaService;
import com.iseplive.api.utils.MediaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

/**
 * Created by Guillaume on 29/07/2017.
 * back
 */
@RestController
@RequestMapping("/media")
public class MediaController {
  @Autowired
  MediaUtils mediaUtils;

  @Autowired
  MediaService mediaService;

  @GetMapping
  public List<Media> getAllMedia() {
    return mediaService.getAllGalleryGazetteVideo();
  }

  @PostMapping("/image")
  public Image addStandaloneImage(@RequestParam("image") MultipartFile image) {
    return mediaService.addImage(image);
  }

  @PostMapping("/attachment")
  public List<Attachment> addFiles(@RequestParam("files") List<MultipartFile> files) {
    return null;
  }

  @PostMapping("/video")
  public Video uploadVideo(@RequestParam("name") String name, @RequestParam("video") MultipartFile video) {
    return mediaService.uploadVideo(name, video);
  }

  @PutMapping("/image/{id}/match/{student}")
  public Image identifyStudentInImage(@PathVariable Long id, @PathVariable Long student) {
    return mediaService.identifyStudentInImage(id, student);
  }

//  @PostMapping("/videoEmbed")
//  public VideoEmbed addVideoEmbed(@RequestBody VideoEmbedDTO dto) {
//    return mediaService.createVideoEmbed(dto);
//  }

  @PostMapping("/gallery/{name}")
  public Gallery createGallery(@PathVariable String name, @RequestParam("images") List<MultipartFile> images) {
    return mediaService.createGallery(name, images);
  }

  @PostMapping("/gazette")
  public void createGazette(@RequestParam("file") MultipartFile file) {

  }

  @GetMapping("/ressource/{type}/{filename:.+}")
  public FileSystemResource downloadRessource(@PathVariable String type, @PathVariable String filename) {
    String baseUrl = mediaUtils.getBaseUrl();
    File file = new File(baseUrl + "/" + type + "/" + filename);
    if (!file.exists()) {
      System.out.println(file.getPath());
      throw new NotFoundException("Cannot find this file");
    }
    return new FileSystemResource(file);
  }

  @DeleteMapping("/ressource/{type}/{filename:.+}")
  public boolean deleteRessource(@PathVariable String type, @PathVariable String filename) {
    String baseUrl = mediaUtils.getBaseUrl();
    File file = new File(baseUrl + "/" + type + "/" + filename);
    return file.delete();
  }

}
