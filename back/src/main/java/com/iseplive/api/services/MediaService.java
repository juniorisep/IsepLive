package com.iseplive.api.services;

import com.iseplive.api.conf.FileException;
import com.iseplive.api.constants.MediaType;
import com.iseplive.api.dao.media.MediaFactory;
import com.iseplive.api.dao.media.MediaRepository;
import com.iseplive.api.dto.VideoEmbedDTO;
import com.iseplive.api.entity.media.*;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.utils.MediaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class MediaService {

  @Autowired
  ImageService imageService;

  @Autowired
  MediaUtils mediaUtils;

  @Autowired
  MediaFactory mediaFactory;

  @Autowired
  MediaRepository mediaRepository;

  @Autowired
  StudentService studentService;

  @Value("${storage.image.url}")
  String imageDir;

  @Value("${storage.video.url}")
  String videoDir;

  @Value("${storage.gazette.url}")
  String gazetteDir;

  public List<Media> getAllGalleryGazetteVideo() {
    return mediaRepository.findAllByMediaTypeInAndPost_Author_AuthorType(
      Arrays.asList(MediaType.GALLERY, MediaType.GAZETTE, MediaType.VIDEO),
      "club"
    );
  }

  public Gazette createGazette(String title, MultipartFile file) {
    String random = mediaUtils.randomName();
    String gazettePath = mediaUtils.resolvePath(
      gazetteDir, random + "_" + title + ".pdf", false);

    mediaUtils.saveFile(gazettePath, file);

    Gazette gazette = new Gazette();
    gazette.setCreation(new Date());
    gazette.setTitle(title);
    gazette.setUrl(mediaUtils.getPublicUrl(gazettePath));
    return mediaRepository.save(gazette);
  }

  public Gallery createGallery(String name, List<MultipartFile> files) {
    Gallery gallery = new Gallery();
    gallery.setName(name);
    gallery.setCreation(new Date());

    List<Image> images = new ArrayList<>();
    files.forEach(file -> {
      images.add(addImage(file));
    });
    gallery.setImages(images);

    return mediaRepository.save(gallery);
  }

  public Image addImage(MultipartFile file) {
    Image image = new Image();
    image.setCreation(new Date());

    String name = mediaUtils.randomName();
    String path = mediaUtils.resolvePath(imageDir, name, false);
    String pathThumb = mediaUtils.resolvePath(imageDir, name, true);
    mediaUtils.saveJPG(file, 1280, path);
    mediaUtils.saveJPG(file, 512, pathThumb);

    image.setFullSizeUrl(mediaUtils.getPublicUrlImage(path));
    image.setThumbUrl(mediaUtils.getPublicUrlImage(pathThumb));
    return mediaRepository.save(image);
  }

  public Image identifyStudentInImage(Long imageId, Long studentId) {
    Image image = imageService.getImage(imageId);
    Student student = studentService.getStudent(studentId);
    Set<Student> matched = image.getMatched();
    matched.add(student);
    return mediaRepository.save(image);
  }

  public VideoEmbed createVideoEmbed(VideoEmbedDTO dto) {
    VideoEmbed videoEmbed = mediaFactory.dtoToVideoEmbedEntity(dto);
    return mediaRepository.save(videoEmbed);
  }

  public Video uploadVideo(String name, MultipartFile videoFile) {
    String random = mediaUtils.randomName();
    String videoPath = mediaUtils.resolvePath(
      videoDir, random + "_" + videoFile.getName() + ".mp4", false);

    mediaUtils.saveFile(videoPath, videoFile);

    Video video = new Video();
    video.setCreation(new Date());
    video.setName(name);
    video.setUrl(mediaUtils.getPublicUrl(videoPath));
    return mediaRepository.save(video);
  }

}
