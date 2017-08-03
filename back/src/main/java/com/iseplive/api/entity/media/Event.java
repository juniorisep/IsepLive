package com.iseplive.api.entity.media;

import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.media.Image;
import com.iseplive.api.entity.media.Media;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
@DiscriminatorValue("event")
public class Event extends Media {

    private String title;
    private String location;
    private Date date;

    private PublishStateEnum publishState;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToOne
    private Club club;

    @OneToOne
    private Image image;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public PublishStateEnum getPublishState() {
        return publishState;
    }

    public void setPublishState(PublishStateEnum publishState) {
        this.publishState = publishState;
    }
}