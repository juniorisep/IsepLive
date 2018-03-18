package com.iseplive.api.utils;

import com.iseplive.api.exceptions.FileException;
import com.iseplive.api.exceptions.IllegalArgumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class MediaUtils {

  private final Logger LOG = LoggerFactory.getLogger(MediaUtils.class);

  @Value("${storage.url}")
  private String baseUrl;

  private final String publicBaseUrl = "/storage";

  public String resolvePath(String dir, String name, boolean thumb) {
    if (thumb) {
      return String.format("%s/%s_thumb", dir, sanitizePath(name));
    }
    return String.format("%s/%s", dir, sanitizePath(name));
  }

  public String resolvePath(String dir, String name, boolean thumb, Date date) {
    return resolvePath(pathGroupByDate(date, dir), name, thumb);
  }

  public String resolvePath(String dir, String name, boolean thumb, String studentId) {
    return resolvePath(pathGroupByStudentId(studentId, dir), name, thumb);
  }

  private String pathGroupByStudentId(String studentId, String dir) {
    return String.format(
      "%s/%s",
      dir,
      studentId.substring(0, studentId.length() - 2)
    );
  }

  private String pathGroupByDate(Date date, String dir) {
    Calendar c = Calendar.getInstance();
    c.setTime(date);
    return String.format(
      "%s/%d/%d/%d",
      dir,
      c.get(Calendar.YEAR),
      c.get(Calendar.MONTH) + 1,
      c.get(Calendar.DATE)
    );
  }

  public String getPublicUrlImage(String path) {
    return publicBaseUrl + path + ".jpg";
  }

  public String getPublicUrl(String path) {
    return publicBaseUrl + path;
  }

  public String randomName(int length) {
    String random = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    StringBuilder out = new StringBuilder();
    for (int i = 0; i < length; i++) {
      int pos = (int) (Math.random() * random.length());
      out.append(random.charAt(pos));
    }
    return out.toString();
  }

  public String randomName() {
    return randomName(30);
  }

  public void removeIfExistPublic(String publicPath) {
    Path p = Paths.get(baseUrl + publicPath.replaceFirst(publicBaseUrl, ""));
    if (Files.exists(p)) {
      try {
        Files.delete(p);
      } catch (IOException e) {
        throw new FileException("could not delete file: " + p, e);
      }
    }
  }

  public void removeIfExist(String path) {
    Path p = Paths.get(baseUrl + path + ".jpg");
    if (Files.exists(p)) {
      try {
        Files.delete(p);
      } catch (IOException e) {
        throw new FileException("could not delete file: " + p, e);
      }
    }
  }

  /**
   * saveFile saves the file to the path specified
   * and creates new directories if needed.
   *
   * @param filePath
   * @param file
   */
  public void saveFile(String filePath, MultipartFile file) {
    try {
      Path path = Paths.get(getPath(filePath));
      Files.createDirectories(path.getParent());
//      File out = path.toFile();
//      boolean created = out.createNewFile();
//
//      if (!created) {
//        throw new FileException("could not create file: " + getPath(filePath));
//      }

      Files.copy(file.getInputStream(), path);

    } catch (IOException e) {
      throw new FileException("could not create file: " + getPath(filePath), e);
    }
  }

  /**
   * Method to resize image and save to jpg
   * extension set by the method
   *
   * @param image
   * @param newWidth
   * @param outputPath
   */
  public void saveJPG(MultipartFile image, int newWidth, String outputPath) {
    try {
      // verify it is an image
      if (!Arrays.asList("image/png", "image/jpeg").contains(image.getContentType())) {
        throw new IllegalArgumentException("The file provided is not a valid image or is not supported (should be png or jpeg): " + image.getContentType());
      }


      // Create input image
      BufferedImage inputImage = ImageIO.read(image.getInputStream());
      newWidth = newWidth > inputImage.getWidth() ? inputImage.getWidth() : newWidth;
      double ratio = (double) inputImage.getWidth() / (double) inputImage.getHeight();
      int scaledHeight = (int) (newWidth / ratio);

      // Create output image
      BufferedImage outputImage = new BufferedImage(newWidth,
        scaledHeight, BufferedImage.TYPE_INT_RGB);

      // Scale output
      Graphics2D g2d = outputImage.createGraphics();
      g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
      g2d.drawImage(inputImage, 0, 0, newWidth, scaledHeight, null);
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
    return name
      .replaceAll("[^a-zA-Z0-9\\s]", "")
      .replaceAll(" ", "-");
  }

  public String getPath(String url) {
    return baseUrl + url;
  }

}
