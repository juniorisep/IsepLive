package com.iseplive.api.entity;

import com.iseplive.api.dto.ImageTypeEnum;
import com.iseplive.api.dto.Media;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
public class Image extends Media {

    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    private ImageTypeEnum type;

    private String link;
    private String thumbLink;
    private Date creation;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }

    public String getThumbLink() {
        return thumbLink;
    }

    public void setThumbLink(String thumbLink) {
        this.thumbLink = thumbLink;
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
}
