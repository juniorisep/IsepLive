package com.iseplive.api.entity.media;

import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@Entity
@DiscriminatorColumn(name = "mediaType")
public abstract class Media {
    @Id
    @GeneratedValue
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
