package com.iseplive.api.services;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.dao.dor.QuestionDorRepository;
import com.iseplive.api.dao.dor.SessionDorRepository;
import com.iseplive.api.dao.dor.VoteDorRepository;
import com.iseplive.api.dao.post.AuthorRepository;
import com.iseplive.api.dto.VoteDorDTO;
import com.iseplive.api.entity.dor.QuestionDor;
import com.iseplive.api.entity.dor.SessionDor;
import com.iseplive.api.entity.dor.VoteDor;
import com.iseplive.api.entity.user.Author;
import com.iseplive.api.exceptions.IllegalArgumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 09/02/2018.
 * back
 */
@Service
public class IsepDorService {

  @Autowired
  QuestionDorRepository questionDorRepository;

  @Autowired
  SessionDorRepository sessionDorRepository;

  @Autowired
  VoteDorRepository voteDorRepository;

  @Autowired
  AuthorRepository authorRepository;

  public SessionDor getCurrentSession() {
    return sessionDorRepository.findByEnabled(true);
  }

  public void handleVote(VoteDorDTO voteDor, TokenPayload payload) {
    QuestionDor questionDor = getQuestionDor(voteDor.getQuestionID());
    if (getPreviousVotes(questionDor, payload.getId()).size() > 0) {
      throw new IllegalArgumentException("this question has always been answered");
    }

    if (voteDor.getAuthorID() != null) {
      Author author = authorRepository.findOne(voteDor.getAuthorID());
      if (author == null) {
        throw new IllegalArgumentException("this author does not exist");
      }
      
    }

  }

  private QuestionDor getQuestionDor(Long questionID) {
    QuestionDor questionDor = questionDorRepository.findOne(questionID);
    if (questionDor == null) {
      throw new IllegalArgumentException("question not found");
    }
    return questionDor;
  }

  private List<VoteDor> getPreviousVotes(QuestionDor questionDor, Long userID) {
    Date now = new Date();
    SessionDor sessionDor = getCurrentSession();
    if (sessionDor == null) {
      throw new IllegalArgumentException("no session active at the moment");
    }

    // if it is the first turn
    if (sessionDor.getFirstTurn().after(now)) {
      return voteDorRepository.findAllByRoundAndStudentIdAndQuestionDorAndSession(1, userID, questionDor, sessionDor);
    }

    // if it is the second turn
    if (sessionDor.getSecondTurn().after(now)) {
      return voteDorRepository.findAllByRoundAndStudentIdAndQuestionDorAndSession(2, userID, questionDor, sessionDor);
    }

    throw new IllegalArgumentException("this session is closed");
  }

}
