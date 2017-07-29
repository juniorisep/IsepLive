package com.iseplive.api.controllers;

import com.iseplive.api.dto.ImageTypeEnum;
import com.iseplive.api.dto.MediaIntegrationDTO;
import com.iseplive.api.entity.media.Image;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by Guillaume on 29/07/2017.
 * back
 */
@RestController
@RequestMapping("/media")
public class MediaController {

    @PostMapping("/image")
    public Image addStandaloneImage(@RequestParam("image") MultipartFile image) {
        return null;
    }

    @PostMapping("/gallery")
    public void createGallery(@RequestParam("images") List<MultipartFile> image) {

    }

    @PostMapping("/integration")
    public void addMediaIntegration(@RequestBody MediaIntegrationDTO mediaIntegration) {

    }

    public void createGazette() {

    }

    public void addGazetteDoc() {

    }

}
