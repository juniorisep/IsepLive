package com.iseplive.api.dto;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
public class VideoIntegrationDTO {
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
