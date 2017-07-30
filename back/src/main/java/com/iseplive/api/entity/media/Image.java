package com.iseplive.api.entity.media;

import com.iseplive.api.dto.ImageTypeEnum;
import com.iseplive.api.dto.Media;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
public class Image implements Media {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ImageTypeEnum type;

    private String fullSize;
    private String smallSize;
    private Date creation;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullSize() {
        return fullSize;
    }

    public void setFullSize(String fullSize) {
        this.fullSize = fullSize;
    }

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }

    public String getSmallSize() {
        return smallSize;
    }

    public void setSmallSize(String smallSize) {
        this.smallSize = smallSize;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ImageTypeEnum getType() {
        return type;
    }

    public void setType(ImageTypeEnum type) {
        this.type = type;
    }

    @Override
    public String getLink() {
        return fullSize;
    }
}
