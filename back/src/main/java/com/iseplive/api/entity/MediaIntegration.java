package com.iseplive.api.entity;

import com.iseplive.api.dto.MediaTypeEnum;

import javax.persistence.*;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
public class MediaIntegration {

    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    private MediaTypeEnum type;

    private String link;

    @OneToOne
    private Gallery gallery;

    public Gallery getGallery() {
        return gallery;
    }

    public void setGallery(Gallery gallery) {
        this.gallery = gallery;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MediaTypeEnum getType() {
        return type;
    }

    public void setType(MediaTypeEnum type) {
        this.type = type;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
