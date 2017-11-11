package com.iseplive.api.controllers.media;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.entity.media.*;
import com.iseplive.api.services.AuthService;
import com.iseplive.api.services.MediaService;
import com.iseplive.api.utils.MediaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

  @PutMapping("/image/{id}/match/{student}/tag")
  public Image tagStudentInImage(@PathVariable Long id,
                                      @PathVariable Long student,
                                      @AuthenticationPrincipal TokenPayload auth) {
    return mediaService.tagStudentInImage(id, student, auth);
  }
  @PutMapping("/image/{id}/match/{student}/untag")
  public void untagStudentInImage(@PathVariable Long id,
                                      @PathVariable Long student,
                                      @AuthenticationPrincipal TokenPayload auth) {
    mediaService.untagStudentInImage(id, student, auth);
  }

//  @PostMapping("/videoEmbed")
//  public VideoEmbed addVideoEmbed(@RequestBody VideoEmbedDTO dto) {
//    return mediaService.createVideoEmbed(dto);
//  }

  @PostMapping("/gallery")
  public Gallery createGallery(@RequestParam("name") String name, @RequestParam("images[]") List<MultipartFile> images) {
    return mediaService.createGallery(name, images);
  }

  @GetMapping("/gallery/{id}")
  public Gallery getGallery(@PathVariable Long id) {
    return mediaService.getGallery(id);
  }

  @PostMapping("/gazette")
  public Gazette createGazette(@RequestParam("title") String title, @RequestParam("file") MultipartFile file) {
    return mediaService.createGazette(title, file);
  }

  @PostMapping("/document")
  public Document createDocument(@RequestParam("name") String name, @RequestParam("document") MultipartFile document) {
    return mediaService.createDocument(name, document);
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
