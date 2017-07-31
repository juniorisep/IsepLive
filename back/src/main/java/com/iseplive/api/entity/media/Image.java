package com.iseplive.api.entity.media;

import com.iseplive.api.dto.ImageTypeEnum;
import com.iseplive.api.entity.user.Student;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
@DiscriminatorValue("image")
public class Image extends Media {

    private String thumbUrl;
    private String fullSizeUrl;
    private Date creation;
    private String description;

    @OneToMany
    private List<Student> matched;

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Student> getMatched() {
        return matched;
    }

    public void setMatched(List<Student> matched) {
        this.matched = matched;
    }

    public String getFullSizeUrl() {
        return fullSizeUrl;
    }

    public void setFullSizeUrl(String fullSizeUrl) {
        this.fullSizeUrl = fullSizeUrl;
    }

    public String getThumbUrl() {
        return thumbUrl;
    }

    public void setThumbUrl(String thumbUrl) {
        this.thumbUrl = thumbUrl;
    }
}
