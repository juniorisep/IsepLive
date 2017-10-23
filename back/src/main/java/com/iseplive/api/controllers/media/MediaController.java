package com.iseplive.api.controllers.media;

import com.iseplive.api.entity.media.*;
import com.iseplive.api.services.AuthService;
import com.iseplive.api.services.MediaService;
import com.iseplive.api.utils.MediaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

  @Autowired
  AuthService authService;

  @GetMapping
  public Page<Media> getAllMedia(@RequestParam(defaultValue = "0") int page) {
    if (authService.isUserAnonymous()) {
      return mediaService.getAllGalleryGazetteVideoPublic(page);
    }
    return mediaService.getAllGalleryGazetteVideo(page);
  }

  @PostMapping("/image")
  public Image addStandaloneImage(@RequestParam("image") MultipartFile image) {
    return mediaService.addImage(image);
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

  @PostMapping("/gallery")
  public Gallery createGallery(@RequestParam("name") String name, @RequestParam("images[]") List<MultipartFile> images) {
    return mediaService.createGallery(name, images);
  }

  @PostMapping("/gazette")
  public Gazette createGazette(@RequestParam("title") String title, @RequestParam("file") MultipartFile file) {
    return mediaService.createGazette(title, file);
  }

//  @GetMapping(value = "/ressource/video/{filename:.+}", produces = "video/png", headers = "Accept-range: byte")
//  public FileSystemResource streamVideo(@PathVariable String filename, HttpRange range) {
//
//    String baseUrl = mediaUtils.getBaseUrl();
//    File file = new File(baseUrl + "/video/" + filename);
//    return new FileSystemResource(file);
//  }

//  @GetMapping("/ressource/{type}/{filename:.+}")
//  public FileSystemResource downloadRessource(@PathVariable String type, @PathVariable String filename) {
//    String baseUrl = mediaUtils.getBaseUrl();
//    File file = new File(baseUrl + "/" + type + "/" + filename);
//    if (!file.exists()) {
//      System.out.println(file.getPath());
//      throw new NotFoundException("Cannot find this file");
//    }
//    ResourceHttpRequestHandler r = new ResourceHttpRequestHandler();
//    return new FileSystemResource(file);
//  }

  @DeleteMapping("/ressource/{type}/{filename:.+}")
  public boolean deleteRessource(@PathVariable String type, @PathVariable String filename) {
    String baseUrl = mediaUtils.getBaseUrl();
    File file = new File(baseUrl + "/" + type + "/" + filename);
    return file.delete();
  }

}
