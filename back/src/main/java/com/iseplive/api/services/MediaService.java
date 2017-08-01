package com.iseplive.api.services;

import com.iseplive.api.dao.media.MediaFactory;
import com.iseplive.api.dao.media.MediaRepository;
import com.iseplive.api.dto.VideoEmbedDTO;
import com.iseplive.api.entity.media.Gallery;
import com.iseplive.api.entity.media.Image;
import com.iseplive.api.entity.media.VideoEmbed;
import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class MediaService {

    @Autowired
    ImageService imageService;

    @Autowired
    ImageUtils imageUtils;

    @Autowired
    MediaFactory mediaFactory;

    @Autowired
    MediaRepository mediaRepository;

    @Autowired
    StudentService studentService;

    @Value("${storage.image.url}")
    String imageDir;

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

        String name = imageUtils.randomName();
        String path = imageUtils.resolvePath(imageDir, name, false);
        String pathThumb = imageUtils.resolvePath(imageDir, name, true);
        imageUtils.saveJPG(file, 1280, path);
        imageUtils.saveJPG(file, 256, pathThumb);

        image.setFullSizeUrl(imageUtils.getPublicUrl(path));
        image.setThumbUrl(imageUtils.getPublicUrl(pathThumb));
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

}
