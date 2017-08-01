package com.iseplive.api.services;

import com.iseplive.api.conf.IllegalArgumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.Normalizer;
import java.util.Arrays;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class ImageUtils {

    private final Logger LOG = LoggerFactory.getLogger(ImageService.class);


    @Value("${storage.url}")
    private String baseUrl;

    private final String publicBaseUrl = "/media/ressource";

    public String resolvePath(String dir, String name, boolean thumb) {
        if (thumb) {
            return dir + "/" + sanitizePath(name) + "_thumb";
        }
        return dir + "/" + sanitizePath(name);
    }

    public String getPublicUrl(String path) {
        return publicBaseUrl + path + ".jpg";
    }

    public String randomName() {
        String  random = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < 30; i++) {
            int pos = (int) (Math.random() * random.length());
            out.append(random.charAt(pos));
        }
        return out.toString();
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
            Path path = Paths.get(baseUrl + outputPath + ".jpg");
            Files.createDirectories(path);
            LOG.debug("writing image to {}", path);
            ImageIO.write(outputImage, "JPG", path.toFile());

        } catch (IOException e) {
            e.printStackTrace();
        }
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
