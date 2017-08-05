package com.iseplive.api.entity.media;

import com.iseplive.api.constants.MediaType;
import com.iseplive.api.entity.user.Student;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
@DiscriminatorValue(MediaType.IMAGE)
public class Image extends Media {

    private String thumbUrl;
    private String fullSizeUrl;
    private Date creation;

    @OneToMany
    private Set<Student> matched;

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }

    public Set<Student> getMatched() {
        return matched;
    }

    public void setMatched(Set<Student> matched) {
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
