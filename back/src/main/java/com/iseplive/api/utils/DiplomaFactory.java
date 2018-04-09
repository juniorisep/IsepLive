package com.iseplive.api.utils;

import com.iseplive.api.dto.dor.DorConfigDTO;
import com.iseplive.api.entity.dor.QuestionDor;
import com.iseplive.api.entity.user.Student;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;

public class DiplomaFactory implements ImageObserver {

  private final Font fontBirthDay;
  private final Font fontName;
  private final Font fontTitle;
  private final DorConfigDTO config;

  private BufferedImage bufferedImage;

  private SimpleDateFormat formater = new SimpleDateFormat("dd/MM/YYYY");


  public DiplomaFactory(DorConfigDTO configDTO, String diplomaPath) throws IOException {
    this.config = configDTO;
    String fontName = "Times";
    this.fontTitle = new Font(fontName, Font.PLAIN, configDTO.getTitre().getFontSize());
    this.fontName = new Font(fontName, Font.PLAIN, configDTO.getName().getFontSize());
    this.fontBirthDay = new Font(fontName, Font.PLAIN, configDTO.getBirthdate().getFontSize());

    this.bufferedImage = ImageIO.read(new File(diplomaPath));
  }

  public BufferedImage generateDiploma(QuestionDor questionDor, Student student) {

    BufferedImage newDiploma = new BufferedImage(bufferedImage.getWidth(), bufferedImage.getHeight(), bufferedImage.getType());
    Graphics2D g = newDiploma.createGraphics();

    g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

    g.drawImage(bufferedImage, 0, 0, this);

    g.setColor(Color.BLACK);


    // Draw title
    g.setFont(fontTitle);
    g.drawString(
      questionDor.getTitle(),
      config.getTitre().getX(),
      config.getTitre().getY() + g.getFont().getSize()
    );

    // Draw name
    g.setFont(fontName);
    g.drawString(
      String.format("%s %s", student.getFirstname(), student.getLastname()),
      config.getName().getX(),
      config.getName().getY() + g.getFont().getSize()
    );

    if (student.getBirthDate() != null) {
      // Draw birthday
      g.setFont(fontBirthDay);
      g.drawString(
        formater.format(student.getBirthDate()),
        config.getName().getX(),
        config.getName().getY() + g.getFont().getSize()
      );
    }

    g.dispose();
    return newDiploma;
  }

  @Override
  public boolean imageUpdate(Image img, int infoflags, int x, int y, int width, int height) {
    return true;
  }
}
