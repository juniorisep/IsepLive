package com.iseplive.api.services;

import com.iseplive.api.dao.image.ImageRepository;
import com.iseplive.api.entity.media.*;
import com.iseplive.api.entity.media.Image;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;

/**
 * Created by Guillaume on 29/07/2017.
 * back
 */
@Service
public class ImageService {

    private final Logger LOG = LoggerFactory.getLogger(ImageService.class);

    @Autowired
    ImageRepository imageRepository;

    public void uploadFile(MultipartFile file) {
        String rawName = file.getOriginalFilename();
        rawName = rawName.substring(0, rawName.lastIndexOf('.'));
        String rndNb = randomStringNumbers(10);
        resizeImage(file, 1000, "out/" + rawName + "_scaled_" + rndNb + ".jpg");
        try {
            Files.copy(file.getInputStream(), Paths.get("out/"+rawName + "_" + rndNb + ".jpg"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String randomStringNumbers(int length) {
        String numbers = "0123456789";
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int pos = (int) Math.round(Math.random() * 9);
            out.append(numbers.charAt(pos));
        }
        return out.toString();
    }

    private void resizeImage(MultipartFile image, int scaledWidth, String outputPath) {
        try {
            // verify it is an image
            if (!Arrays.asList("image/png", "image/jpg").contains(image.getContentType())) {
                throw new RuntimeException("The file provided is not a valid image or is not supported (should be png or jpeg)");
            }

            // Create input image
            BufferedImage inputImage = ImageIO.read(image.getInputStream());
            double ratio = (double) inputImage.getWidth() / (double) inputImage.getHeight();
            int scaledHeight = (int) (scaledWidth / ratio);

            // Create output image
            BufferedImage outputImage = new BufferedImage(scaledWidth,
                    scaledHeight, BufferedImage.TYPE_INT_RGB);

            // Scale output
            Graphics2D g2d = outputImage.createGraphics();
            g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR );
            g2d.drawImage(inputImage, 0, 0, scaledWidth, scaledHeight, null);
            g2d.dispose();

            // Write output to file
            ImageIO.write(outputImage, "JPG", new File(outputPath));

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Image getImage(Long id) {
        Image img = imageRepository.findOne(id);
        if (img != null) {
            return img;
        }
        throw new RuntimeException("could not get the image with id: "+id);
    }
}
