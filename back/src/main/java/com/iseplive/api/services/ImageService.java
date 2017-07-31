package com.iseplive.api.services;

import com.iseplive.api.conf.IllegalArgumentException;
import com.iseplive.api.dao.image.ImageRepository;
import com.iseplive.api.dto.ImageTypeEnum;
import com.iseplive.api.entity.media.*;
import com.iseplive.api.entity.media.Image;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.Normalizer;
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

    @Value("${storage.url}")
    private String baseUrl;

    private final String publicBaseUrl = "/media/ressource";


    public String getFileName(MultipartFile file) {
        String rawName = file.getOriginalFilename();
        rawName = rawName.substring(0, rawName.lastIndexOf('.'));
        return rawName;
    }

    public String resolvePath(String dir, String name, boolean thumb) {
        if (thumb) {
            return dir + "/" + sanitizePath(name) + "_thumb";
        }
        return dir + "/" + sanitizePath(name);
    }

    public String getPublicPath(String path) {
        return publicBaseUrl + path + ".jpg";
    }

    /**
     * Method to resize image and save to jpg
     * extension set by the method
     *
     * @param image
     * @param scaledWidth
     * @param outputPath
     */
    public void saveJPG(MultipartFile image, int scaledWidth, String outputPath) {
        try {
            // verify it is an image
            if (!Arrays.asList("image/png", "image/jpeg").contains(image.getContentType())) {
                throw new IllegalArgumentException("The file provided is not a valid image or is not supported (should be png or jpeg): "+image.getContentType());
            }

            // Create input image
            BufferedImage inputImage = ImageIO.read(image.getInputStream());
            scaledWidth = scaledWidth > inputImage.getWidth() ? inputImage.getWidth() : scaledWidth;
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
            File fileOutput = new File(baseUrl + outputPath + ".jpg");
            Files.createDirectories(Paths.get(baseUrl + outputPath + ".jpg"));
//            if (!fileOutput.getParentFile().canWrite()) {
//                LOG.error("Cannot write here: {}", fileOutput.getParentFile());
//                throw new RuntimeException("The directory has not been created");
//            } else {
//                if (!fileOutput.getParentFile().exists()) {
//                    fileOutput.getParentFile().mkdirs();
//                }
//                fileOutput.createNewFile();
//            }
            ImageIO.write(outputImage, "JPG", fileOutput);

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

    public String getBaseUrl() {
        return baseUrl;
    }

    private String sanitizePath(String name) {
        name = Normalizer.normalize(name, Normalizer.Form.NFD);
        name = name.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
        return name.replaceAll(" ", "-");
    }

    private String getPath(String url) {
        return baseUrl + url;
    }
}
