package com.iseplive.api.entity;

import com.iseplive.api.entity.user.Student;

import javax.persistence.*;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Entity
public class ClubMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private Club club;

    @OneToOne
    private ClubRole role;

    @OneToOne
    private Student member;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getMember() {
        return member;
    }

    public void setMember(Student member) {
        this.member = member;
    }

    public ClubRole getRole() {
        return role;
    }

    public void setRole(ClubRole role) {
        this.role = role;
    }

    public Club getClub() {
        return club;
    }

    public void setClub(Club club) {
        this.club = club;
    }
}
