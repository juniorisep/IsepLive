package com.iseplive.api.entity.poll;

import com.iseplive.api.entity.media.Media;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Entity
@DiscriminatorValue("poll")
public class Poll extends Media {

    private String name;

    @OneToMany(mappedBy = "poll")
    private List<PollQuestion> questions;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PollQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<PollQuestion> questions) {
        this.questions = questions;
    }
}
