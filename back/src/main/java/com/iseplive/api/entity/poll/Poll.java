package com.iseplive.api.entity.poll;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Entity
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "poll")
    private List<PollQuestion> questions;

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

    public List<PollQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<PollQuestion> questions) {
        this.questions = questions;
    }
}
