package com.iseplive.api.dto.view;

public class AnswerDorDTO {
  private Long idAnswer;
  private AnswerDorType type;
  private long score = 0;

  public AnswerDorDTO(Long idAnswer, AnswerDorType type) {
    this.idAnswer = idAnswer;
    this.type = type;
  }


  public Long getIdAnswer() {
    return idAnswer;
  }

  public void setIdAnswer(Long idAnswer) {
    this.idAnswer = idAnswer;
  }

  public AnswerDorType getType() {
    return type;
  }

  public void setType(AnswerDorType type) {
    this.type = type;
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof AnswerDorDTO) {
      return ((AnswerDorDTO) obj).getIdAnswer().equals(idAnswer) && ((AnswerDorDTO) obj).getType().equals(type);
    }
    return super.equals(obj);
  }

  public Long getScore() {
    return score;
  }

  public void setScore(Long score) {
    this.score = score;
  }
}
