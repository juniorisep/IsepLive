package com.iseplive.api.entity.media;

import com.iseplive.api.dto.Media;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
public class Gallery implements Media {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date creation;

    @OneToMany
    private List<Image> images;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    @Override
    public String getLink() {
        return null;
    }
}
