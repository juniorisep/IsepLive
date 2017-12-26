package com.iseplive.api.services;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.constants.MediaType;
import com.iseplive.api.constants.Roles;
import com.iseplive.api.dao.image.ImageRepository;
import com.iseplive.api.dao.image.MatchedRepository;
import com.iseplive.api.dao.media.MediaFactory;
import com.iseplive.api.dao.media.MediaRepository;
import com.iseplive.api.dto.VideoEmbedDTO;
import com.iseplive.api.entity.media.*;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.exceptions.IllegalArgumentException;
import com.iseplive.api.utils.MediaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

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
  MatchedRepository matchedRepository;

  @Autowired
  ImageRepository imageRepository;

  @Autowired
  StudentService studentService;

  @Value("${storage.image.url}")
  String imageDir;

  @Value("${storage.video.url}")
  String videoDir;

  @Value("${storage.gazette.url}")
  String gazetteDir;

  @Value("${storage.document.url}")
  String documentDir;

  private final int ALL_MEDIA_PAGE_SIZE = 20;

  private final int WIDTH_IMAGE_SIZE = 1280;
  private final int WIDTH_IMAGE_SIZE_THUMB = 768;

  public Page<Media> getAllGalleryGazetteVideoPublic(int page) {
    return mediaRepository.findAllByMediaTypeInAndPost_Author_AuthorTypeAndPost_isPrivateOrderByCreationDesc(
      Arrays.asList(MediaType.GALLERY, MediaType.GAZETTE, MediaType.VIDEO),
      "club", false, new PageRequest(page, ALL_MEDIA_PAGE_SIZE)
    );
  }

  public Page<Media> getAllGalleryGazetteVideo(int page) {
    return mediaRepository.findAllByMediaTypeInAndPost_Author_AuthorTypeOrderByCreationDesc(
      Arrays.asList(MediaType.GALLERY, MediaType.GAZETTE, MediaType.VIDEO),
      "club", new PageRequest(page, ALL_MEDIA_PAGE_SIZE)
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

  public Document createDocument(String name, MultipartFile fileUploaded) {
    Document document = new Document();
    document.setCreation(new Date());

    String random = mediaUtils.randomName();
    String documentPath = mediaUtils.resolvePath(
      documentDir, random + "_" + fileUploaded.getOriginalFilename(),
      false, document.getCreation());

    mediaUtils.saveFile(documentPath, fileUploaded);

    document.setName(name);
    document.setOriginalName(fileUploaded.getOriginalFilename());
    document.setPath(mediaUtils.getPublicUrl(documentPath));
    return mediaRepository.save(document);
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
    String path = mediaUtils.resolvePath(imageDir, name, false, image.getCreation());
    String pathThumb = mediaUtils.resolvePath(imageDir, name, true, image.getCreation());
    mediaUtils.saveJPG(file, WIDTH_IMAGE_SIZE, path);
    mediaUtils.saveJPG(file, WIDTH_IMAGE_SIZE_THUMB, pathThumb);

    image.setFullSizeUrl(mediaUtils.getPublicUrlImage(path));
    image.setThumbUrl(mediaUtils.getPublicUrlImage(pathThumb));
    return mediaRepository.save(image);
  }

  public void tagStudentInImage(Long imageId, Long studentId, TokenPayload auth) {
    Image image = imageService.getImage(imageId);
    Student match = studentService.getStudent(studentId);
    Student owner = studentService.getStudent(auth.getId());
    Matched matched = new Matched();
    matched.setMatch(match);
    matched.setOwner(owner);
    matched.setImage(image);
    matchedRepository.save(matched);
  }

  public void untagStudentInImage(Long imageId, Long studentId, TokenPayload auth) {
    Image image = imageService.getImage(imageId);
    List<Matched> matchedList = matchedRepository.findAllByImage(image);
    Student match = studentService.getStudent(studentId);
    Student owner = studentService.getStudent(auth.getId());
    matchedList.forEach(m -> {
      if (m.getMatch().equals(match)) {
        if (auth.getRoles().contains(Roles.ADMIN) || auth.getRoles().contains(Roles.USER_MANAGER)) {
          matchedRepository.delete(m);
        }

        if (m.getOwner().equals(owner)) {
          matchedRepository.delete(m);
        }
      }
    });
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

  public Gallery getGallery(Long id) {
    Media media = mediaRepository.findOne(id);
    if (media instanceof Gallery) {
      return (Gallery) media;
    }
    throw new IllegalArgumentException("Could not find gallery with id: "+id);
  }

  public List<Matched> getImageTags(Long id) {
    Image image = imageRepository.findOne(id);
    if (image == null) {
      throw new IllegalArgumentException("could not find this image");
    }
    return image.getMatched();
  }
}
