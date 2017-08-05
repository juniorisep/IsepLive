package com.iseplive.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iseplive.api.constants.PublishStateEnum;
import com.iseplive.api.entity.media.Media;
import com.iseplive.api.entity.user.Author;
import com.iseplive.api.entity.user.Student;

import javax.persistence.*;
import java.util.*;

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
    private Author author;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany
    private Set<Student> like = new HashSet<>();

    @JsonIgnore
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

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
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

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public int getLikes() {
        return like.size();
    }

    public Set<Student> getLike() {
        return like;
    }

    public void setLike(Set<Student> like) {
        this.like = like;
    }
}
