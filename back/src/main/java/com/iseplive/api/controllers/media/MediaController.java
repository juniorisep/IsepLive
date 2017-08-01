package com.iseplive.api.controllers.media;

import com.iseplive.api.conf.NotFoundException;
import com.iseplive.api.dto.VideoEmbedDTO;
import com.iseplive.api.entity.media.Gallery;
import com.iseplive.api.entity.media.Image;
import com.iseplive.api.entity.media.VideoEmbed;
import com.iseplive.api.services.ImageUtils;
import com.iseplive.api.services.MediaService;
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
    ImageUtils imageUtils;

    @Autowired
    MediaService mediaService;

    @PostMapping("/image")
    public Image addStandaloneImage(@RequestParam("image") MultipartFile image) {
        return mediaService.addImage(image);
    }

    @PutMapping("/image/{id}/match/{student}")
    public Image identifyStudentInImage(@PathVariable Long id, @PathVariable Long student) {
        return mediaService.identifyStudentInImage(id, student);
    }

    @PostMapping("/videoEmbed")
    public VideoEmbed addVideoEmbed(@RequestBody VideoEmbedDTO dto) {
        return mediaService.createVideoEmbed(dto);
    }

    @PostMapping("/gallery/{name}")
    public Gallery createGallery(@PathVariable String name, @RequestParam("images") List<MultipartFile> images) {
        return mediaService.createGallery(name, images);
    }

    @PostMapping("/gazette")
    public void createGazette() {

    }

    @GetMapping("/ressource/{type}/{filename:.+}")
    public FileSystemResource downloadRessource(@PathVariable String type, @PathVariable String filename) {
        String baseUrl = imageUtils.getBaseUrl();
        File file = new File(baseUrl + "/"+  type + "/" + filename);
        if (!file.exists()) {
            System.out.println(file.getPath());
            throw new NotFoundException("Cannot find this file");
        }
        return new FileSystemResource(file);
    }

}
