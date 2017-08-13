package com.iseplive.api.entity.poll;

import com.iseplive.api.entity.media.Media;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
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
  private List<PollAnswer> answers;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<PollAnswer> getAnswers() {
    return answers;
  }

  public void setAnswers(List<PollAnswer> answers) {
    this.answers = answers;
  }
}
