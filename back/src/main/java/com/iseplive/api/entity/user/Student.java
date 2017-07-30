package com.iseplive.api.entity.user;

import com.iseplive.api.entity.Club;
import com.iseplive.api.entity.media.Image;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer promo;
    private String firstname;
    private String lastname;
    private Date birthDate;
    private String phone;

    @OneToOne
    private Image photo;

    @Column(length = 300)
    private String bio;

    @OneToMany
    private List<Club> clubs;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPromo() {
        return promo;
    }

    public void setPromo(Integer promo) {
        this.promo = promo;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<Club> getClubs() {
        return clubs;
    }

    public void setClubs(List<Club> clubs) {
        this.clubs = clubs;
    }

    public Image getPhoto() {
        return photo;
    }

    public void setPhoto(Image photo) {
        this.photo = photo;
    }
}
