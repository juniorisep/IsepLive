package com.iseplive.api.controllers.media;

import com.iseplive.api.conf.NotFoundException;
import com.iseplive.api.dto.ImageTypeEnum;
import com.iseplive.api.entity.media.Image;
import com.iseplive.api.entity.media.VideoIntegration;
import com.iseplive.api.services.ImageService;
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
    ImageService imageService;

    @PostMapping("/image/{type}")
    public Image addStandaloneImage(@RequestParam("image") MultipartFile image, @PathVariable ImageTypeEnum type) {
        return null;
    }

    @PostMapping("/videoIntegration")
    public VideoIntegration addVideoIntegration() {
        return null;
    }

    @PostMapping("/gallery")
    public void createGallery(@RequestParam("images") List<MultipartFile> image) {

    }

    @PostMapping("/gazette")
    public void createGazette() {

    }

    public void addGazetteDoc() {

    }

    @GetMapping("/ressource/{type}/{filename:.+}")
    public FileSystemResource downloadRessource(@PathVariable String type, @PathVariable String filename) {
        String baseUrl = imageService.getBaseUrl();
        File file = new File(baseUrl + "/"+  type + "/" + filename);
        if (!file.exists()) {
            System.out.println(file.getPath());
            throw new NotFoundException("Cannot find this file");
        }
        return new FileSystemResource(file);
    }

}
