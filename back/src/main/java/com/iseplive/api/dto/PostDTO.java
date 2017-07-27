package com.iseplive.api.dto;

import java.util.Date;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
public class PostDTO {
    private String title;
    private Date creationDate;
    private String content;
    private Long authorId;
    private Long mediaId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}