package com.iseplive.api.entity.user;

import javax.persistence.*;

/**
 * Created by Guillaume on 03/08/2017.
 * back
 */
@Entity
@DiscriminatorColumn(name = "authorType")
public abstract class Author {
    @Id
    @GeneratedValue
    private Long id;

    @Column(updatable = false, insertable = false)
    private String authorType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthorType() {
        return authorType;
    }
}
