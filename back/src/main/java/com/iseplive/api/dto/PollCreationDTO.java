package com.iseplive.api.dto;

import java.util.List;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
public class PollCreationDTO {
    private String title;
    private List<String> questions;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }
}
