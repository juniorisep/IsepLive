package com.iseplive.api.services;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.constants.MediaType;
import com.iseplive.api.constants.Roles;
import com.iseplive.api.dao.image.ImageRepository;
import com.iseplive.api.dao.image.MatchedRepository;
import com.iseplive.api.dao.media.MediaFactory;
import com.iseplive.api.dao.media.MediaRepository;
import com.iseplive.api.dto.VideoEmbedDTO;
import com.iseplive.api.dto.view.MatchedView;
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
import java.util.stream.Collectors;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class MediaService {

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

  private final int PHOTOS_PER_PAGE = 30;

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
    String gazettePath = String.format(
      "%s_%s.pdf",
      mediaUtils.resolvePath(gazetteDir, random, false),
      title
    );

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
    String documentPath = String.format(
      "%s_%s",
      mediaUtils.resolvePath(documentDir, random,false, document.getCreation()),
      fileUploaded.getOriginalFilename()
    );

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

    Gallery galleryRes = mediaRepository.save(gallery);

    List<Image> images = new ArrayList<>();
    files.forEach(file -> images.add(addImage(file, galleryRes)));
    mediaRepository.save(images);

    return galleryRes;
  }

  public Image addImage(MultipartFile file) {
    return addImage(file, null);
  }

  public void deleteImageFile(Image image) {
    mediaUtils.removeIfExistPublic(image.getThumbUrl());
    mediaUtils.removeIfExistPublic(image.getFullSizeUrl());
    mediaUtils.removeIfExistPublic(image.getOriginalUrl());
  }

  public void tagStudentInImage(Long imageId, Long studentId, TokenPayload auth) {
    Image image = getImage(imageId);
    List<Matched> matchedList = matchedRepository.findAllByImage(image);
    int res = matchedList.stream()
      .filter(m -> m.getMatch().getId().equals(studentId))
      .collect(Collectors.toList()).size();
    if (res > 0) {
      throw new IllegalArgumentException("this user is already tagged");
    }
    Student match = studentService.getStudent(studentId);
    Student owner = studentService.getStudent(auth.getId());
    Matched matched = new Matched();
    matched.setMatch(match);
    matched.setOwner(owner);
    matched.setImage(image);
    matchedRepository.save(matched);
  }

  public void untagStudentInImage(Long imageId, Long studentId, TokenPayload auth) {
    Image image = getImage(imageId);
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
    String videoPath = String.format(
      "%s_%s.mp4",
      mediaUtils.resolvePath(videoDir, random, false),
      videoFile.getName()
    );

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

  public Page<MatchedView> getPhotosTaggedByStudent(Long studentId, int page) {
    return matchedRepository.findAllByMatchId(studentId, new PageRequest(page, PHOTOS_PER_PAGE)).map(m -> {
      MatchedView matchedView = new MatchedView();
      matchedView.setId(m.getId());
      matchedView.setImage(m.getImage());
      matchedView.setOwner(m.getOwner());
      Gallery gallery = m.getImage().getGallery();
      if (gallery != null) {
        matchedView.setGalleryId(gallery.getId());
      }
      return matchedView;
    });
  }

  public List<Image> getGalleryImages(Long id) {
    Gallery gallery = getGallery(id);
    return gallery.getImages();
  }

  public void deleteImagesGallery(List<Long> ids) {
    List<Image> images = imageRepository.findImageByIdIn(ids);
    images.forEach(this::deleteImageFile);
    imageRepository.delete(images);
  }

  private Image addImage(MultipartFile file, Gallery gallery) {
    Image image = new Image();
    image.setCreation(new Date());
    image.setGallery(gallery);

    String name = mediaUtils.randomName();

    String path = mediaUtils.resolvePath(imageDir, name, false, image.getCreation());
    mediaUtils.saveJPG(file, WIDTH_IMAGE_SIZE, path);

    String pathThumb = mediaUtils.resolvePath(imageDir, name, true, image.getCreation());
    mediaUtils.saveJPG(file, WIDTH_IMAGE_SIZE_THUMB, pathThumb);

    String pathOriginal = String.format(
      "%s_%s",
      mediaUtils.resolvePath(imageDir, name, false, image.getCreation()),
      file.getOriginalFilename().replaceAll(" ", "-")
    );
    mediaUtils.saveFile(pathOriginal, file);

    image.setFullSizeUrl(mediaUtils.getPublicUrlImage(path));
    image.setThumbUrl(mediaUtils.getPublicUrlImage(pathThumb));
    image.setOriginalUrl(mediaUtils.getPublicUrl(pathOriginal));
    return mediaRepository.save(image);
  }

  private Image getImage(Long id) {
    Image img = imageRepository.findOne(id);
    if (img != null) {
      return img;
    }
    throw new RuntimeException("could not get the image with id: " + id);
  }

  public void addImagesGallery(Gallery gallery, List<MultipartFile> files) {
    List<Image> images = new ArrayList<>();
    files.forEach(file -> images.add(addImage(file, gallery)));
    mediaRepository.save(images);
  }
}
