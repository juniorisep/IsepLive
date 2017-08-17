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

  public List<Media> getAllGalleryGazetteVideo() {
    return mediaRepository.findAllByMediaTypeIn(
      Arrays.asList(MediaType.IMAGE, MediaType.GAZETTE, MediaType.VIDEO)
    );
  }

  public Gallery createGallery(String name, List<MultipartFile> files) {
    Gallery gallery = new Gallery();
    gallery.setCreation(new Date());
    gallery.setName(name);

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
      videoDir, random + "_" + videoFile.getOriginalFilename(), false);
    try {
      Path path = Paths.get(mediaUtils.getPath(videoPath));
      Files.createDirectories(path.getParent());
      File out = path.toFile();
      boolean created = out.createNewFile();

      if (!created) {
        throw new FileException("could not create file: " + mediaUtils.getPath(videoPath));
      }

      byte[] bytes = videoFile.getBytes();
      Files.write(path, bytes);

    } catch (IOException e) {
      throw new FileException("could not create file: " + mediaUtils.getPath(videoPath));
    }

    Video video = new Video();
    video.setName(name);
    video.setUrl(mediaUtils.getPublicUrl(videoPath));
    return mediaRepository.save(video);
  }

}
