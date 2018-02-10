package com.iseplive.api.dto;

/**
 * Created by Guillaume on 10/02/2018.
 * back
 */
public class VoteDorDTO {
  private Long questionID;

  private Long authorID;
  private Long eventID;
  private Long partyID;

  public Long getQuestionID() {
    return questionID;
  }

  public void setQuestionID(Long questionID) {
    this.questionID = questionID;
  }

  public Long getEventID() {
    return eventID;
  }

  public void setEventID(Long eventID) {
    this.eventID = eventID;
  }

  public Long getPartyID() {
    return partyID;
  }

  public void setPartyID(Long partyID) {
    this.partyID = partyID;
  }

  public Long getAuthorID() {
    return authorID;
  }

  public void setAuthorID(Long authorID) {
    this.authorID = authorID;
  }
}
