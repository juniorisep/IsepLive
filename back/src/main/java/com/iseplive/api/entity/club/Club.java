package com.iseplive.api.entity.club;

import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.media.Image;
import com.iseplive.api.entity.user.Student;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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

    @OneToOne
    private Student admin;

    @OneToMany(mappedBy = "club")
    private List<ClubMember> members;

    @Enumerated(EnumType.STRING)
    private PublishStateEnum publishState;

    private String logoUrl;
    private String logoThumbUrl;

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

    public PublishStateEnum getPublishState() {
        return publishState;
    }

    public void setPublishState(PublishStateEnum publishState) {
        this.publishState = publishState;
    }

    public Student getAdmin() {
        return admin;
    }

    public void setAdmin(Student admin) {
        this.admin = admin;
    }

    public List<ClubMember> getMembers() {
        return members;
    }

    public void setMembers(List<ClubMember> members) {
        this.members = members;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getLogoThumbUrl() {
        return logoThumbUrl;
    }

    public void setLogoThumbUrl(String logoThumbUrl) {
        this.logoThumbUrl = logoThumbUrl;
    }
}