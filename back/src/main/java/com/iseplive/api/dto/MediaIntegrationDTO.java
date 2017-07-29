package com.iseplive.api.dto;

/**
 * Created by Guillaume on 29/07/2017.
 * back
 */
public class MediaIntegrationDTO {
    private MediaTypeEnum type;
    private String link;
    private Long mediaId;

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

    public Long getMediaId() {
        return mediaId;
    }

    public void setMediaId(Long mediaId) {
        this.mediaId = mediaId;
    }
}
