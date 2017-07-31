package com.iseplive.api.entity;

import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.media.Media;
import com.iseplive.api.entity.user.Student;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private Date creationDate;

    @Column(columnDefinition = "TEXT")
    private String content;

    @OneToOne
    private Media media;

    @OneToOne
    private Student author;

    @Enumerated(EnumType.STRING)
    private PublishStateEnum publishState;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Student getAuthor() {
        return author;
    }

    public void setAuthor(Student author) {
        this.author = author;
    }

    public PublishStateEnum getPublishState() {
        return publishState;
    }

    public void setPublishState(PublishStateEnum publishState) {
        this.publishState = publishState;
    }

    public Media getMedia() {
        return media;
    }

    public void setMedia(Media media) {
        this.media = media;
    }
}
