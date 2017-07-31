package com.iseplive.api.entity.media;

import com.iseplive.api.dto.VideoIntegrationEnum;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@Entity
@DiscriminatorValue("videoIntegration")
public class VideoIntegration extends Media {

    private VideoIntegrationEnum type;
    private String url;

    public VideoIntegrationEnum getType() {
        return type;
    }

    public void setType(VideoIntegrationEnum type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
