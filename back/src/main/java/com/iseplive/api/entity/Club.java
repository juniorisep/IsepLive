package com.iseplive.api.entity;

import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.media.Image;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private Date creation;
    private String website;

    @Enumerated(EnumType.STRING)
    private PublishStateEnum publishState;

    @OneToOne
    private Image logo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreation() {
        return creation;
    }

    public void setCreation(Date creation) {
        this.creation = creation;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Image getLogo() {
        return logo;
    }

    public void setLogo(Image logo) {
        this.logo = logo;
    }

    public PublishStateEnum getPublishState() {
        return publishState;
    }

    public void setPublishState(PublishStateEnum publishState) {
        this.publishState = publishState;
    }
}
