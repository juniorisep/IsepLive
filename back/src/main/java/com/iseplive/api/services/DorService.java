package com.iseplive.api.services;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.dao.dor.EventDorRepository;
import com.iseplive.api.dao.dor.QuestionDorRepository;
import com.iseplive.api.dao.dor.SessionDorRepository;
import com.iseplive.api.dao.dor.VoteDorRepository;
import com.iseplive.api.dao.post.AuthorRepository;
import com.iseplive.api.dto.dor.QuestionDorDTO;
import com.iseplive.api.dto.dor.SessionDorDTO;
import com.iseplive.api.dto.dor.VoteDorDTO;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.dor.EventDor;
import com.iseplive.api.entity.dor.QuestionDor;
import com.iseplive.api.entity.dor.SessionDor;
import com.iseplive.api.entity.dor.VoteDor;
import com.iseplive.api.entity.user.Author;
import com.iseplive.api.entity.user.Employee;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.exceptions.IllegalArgumentException;
import com.iseplive.api.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 09/02/2018.
 * back
 */
@Service
public class DorService {

  @Autowired
  QuestionDorRepository questionDorRepository;

  @Autowired
  SessionDorRepository sessionDorRepository;

  @Autowired
  VoteDorRepository voteDorRepository;

  @Autowired
  EventDorRepository eventDorRepository;

  @Autowired
  AuthorRepository authorRepository;

  @Autowired
  StudentService studentService;

  public SessionDor createSession(SessionDorDTO sessionDorDTO) {
    SessionDor sessionDor = new SessionDor();
    sessionDor.setFirstTurn(sessionDorDTO.getFirstTurn());
    sessionDor.setSecondTurn(sessionDorDTO.getSecondTurn());
    sessionDor.setResult(sessionDorDTO.getResult());
    return sessionDorRepository.save(sessionDor);
  }

  public QuestionDor createQuestion(QuestionDorDTO questionDorDTO) {
    QuestionDor questionDor = new QuestionDor();
    int nbQuestions = getQuestions().size();
    questionDor.setPosition(nbQuestions + 1);
    questionDor.setTitle(questionDorDTO.getTitle());

    questionDor.setEnableStudent(questionDorDTO.isEnableStudent());
    questionDor.setEnableClub(questionDorDTO.isEnableClub());
    questionDor.setEnableEmployee(questionDorDTO.isEnableEmployee());
    questionDor.setEnableEvent(questionDorDTO.isEnableEvent());
    questionDor.setEnableParty(questionDorDTO.isEnableParty());
    questionDor.setEnablePromo(questionDor.isEnablePromo());
    questionDor.setPromo(questionDor.getPromo());
    return questionDorRepository.save(questionDor);
  }

  public List<SessionDor> getSessions() {
    return sessionDorRepository.findAll();
  }

  public List<QuestionDor> getQuestions() {
    return questionDorRepository.findAllByOrderByPosition();
  }

  public VoteDor handleVote(VoteDorDTO voteDor, TokenPayload payload) {
    SessionDor sessionDor = getCurrentSession();
    if (sessionDor == null) {
      throw new IllegalArgumentException("No session active");
    }

    QuestionDor questionDor = getQuestionDor(voteDor.getQuestionID());
    Student student = studentService.getStudent(payload.getId());

    if (getPreviousVotes(sessionDor, questionDor, payload.getId()).size() > 0) {
      throw new IllegalArgumentException("this question has always been answered");
    }

    int round = getRound(sessionDor);
    VoteDor newVoteDor = new VoteDor();
    newVoteDor.setSession(sessionDor);
    newVoteDor.setRound(round);
    newVoteDor.setQuestionDor(questionDor);
    newVoteDor.setStudent(student);
    newVoteDor.setDate(new Date());

    if (voteDor.getAuthorID() != null) {
      Author author = authorRepository.findOne(voteDor.getAuthorID());
      if (author == null) {
        throw new IllegalArgumentException("this author does not exist");
      }

      boolean errorStudent = author instanceof Student && !questionDor.isEnableStudent();
      boolean errorClub = author instanceof Club && !questionDor.isEnableClub();
      boolean errorEmp = author instanceof Employee && !questionDor.isEnableEmployee();

      if (errorStudent || errorClub || errorEmp) {
        throw new IllegalArgumentException("this answer is not available");
      }

      if (author instanceof Student) {
        if (!((Student) author).getPromo().equals(questionDor.getPromo())) {
          throw new IllegalArgumentException("you cannot choose this student");
        }
      }

      newVoteDor.setResAuthor(author);
      return voteDorRepository.save(newVoteDor);
    }

    if (voteDor.getEventID() != null || voteDor.getPartyID() != null) {
      EventDor event = eventDorRepository.findOne(voteDor.getEventID());
      if (event == null) {
        throw new IllegalArgumentException("this event does not exist");
      }

      boolean errorEvent = !event.isParty() && !questionDor.isEnableEvent();
      boolean errorParty = event.isParty() && !questionDor.isEnableParty();

      if (errorEvent || errorParty) {
        throw new IllegalArgumentException("this answer is not available");
      }

      newVoteDor.setResEvent(event);
      return voteDorRepository.save(newVoteDor);
    }

    throw new IllegalArgumentException("cannot vote for this");
  }

  private SessionDor getCurrentSession() {
    return sessionDorRepository.findByEnabled(true);
  }

  private int getRound(SessionDor sessionDor) {
    Date now = new Date();
    if (sessionDor.getFirstTurn().after(now)) {
      return 1;
    }

    if (sessionDor.getSecondTurn().after(now)) {
      return 2;
    }
    throw new IllegalArgumentException("session ended");
  }

  private QuestionDor getQuestionDor(Long questionID) {
    QuestionDor questionDor = questionDorRepository.findOne(questionID);
    if (questionDor == null) {
      throw new IllegalArgumentException("question not found");
    }
    return questionDor;
  }

  private SessionDor getSessionDor(Long sessionID) {
    SessionDor sessionDor = sessionDorRepository.findOne(sessionID);
    if (sessionDor == null) {
      throw new IllegalArgumentException("session not found");
    }
    return sessionDor;
  }

  private List<VoteDor> getPreviousVotes(SessionDor sessionDor, QuestionDor questionDor, Long userID) {
    Date now = new Date();
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

  public void toggleSession(Long id) {
    SessionDor sessionDor = getSessionDor(id);
    sessionDor.setEnabled(!sessionDor.isEnabled());
    sessionDorRepository.save(sessionDor);
  }

  public void deleteSession(Long id) {
    SessionDor sessionDor = getSessionDor(id);
    sessionDorRepository.delete(sessionDor);
  }

  public void deleteQuestion(Long id) {
    QuestionDor questionDor = getQuestionDor(id);
    int pos = questionDor.getPosition();
    questionDorRepository.delete(questionDor);
    questionDorRepository.updatePosAfterDelete(pos);
  }

  public void updateSession(Long id, SessionDor dorSession) {
    SessionDor sessionDor = getSessionDor(id);
    sessionDor.setEnabled(dorSession.isEnabled());
    sessionDor.setFirstTurn(dorSession.getFirstTurn());
    sessionDor.setSecondTurn(dorSession.getSecondTurn());
    sessionDor.setResult(dorSession.getResult());
    sessionDorRepository.save(sessionDor);
  }

  public QuestionDor updateQuestion(Long id, QuestionDor questionDor) {
    QuestionDor newQuestionDor = getQuestionDor(id);

    if (newQuestionDor.getPosition() != questionDor.getPosition()) {
      questionDorRepository.beforeMoveToPos(newQuestionDor.getPosition(), questionDor.getPosition());
    }

    newQuestionDor.setPosition(questionDor.getPosition());
    newQuestionDor.setTitle(questionDor.getTitle());

    newQuestionDor.setEnableStudent(questionDor.isEnableStudent());
    newQuestionDor.setEnableClub(questionDor.isEnableClub());
    newQuestionDor.setEnableEmployee(questionDor.isEnableEmployee());
    newQuestionDor.setEnableEvent(questionDor.isEnableEvent());
    newQuestionDor.setEnableParty(questionDor.isEnableParty());
    newQuestionDor.setEnablePromo(questionDor.isEnablePromo());
    newQuestionDor.setPromo(questionDor.getPromo());

    return questionDorRepository.save(newQuestionDor);
  }

  public EventDor createEvent(EventDor event) {
    return eventDorRepository.save(event);
  }

  public List<EventDor> getEvents() {
    return eventDorRepository.findAll();
  }

  public EventDor getEvent(Long id) {
    EventDor eventDor = eventDorRepository.findOne(id);
    if (eventDor == null) {
      throw new NotFoundException("could not find this event");
    }
    return eventDor;
  }

  public void deleteEvent(Long id) {
    EventDor eventDor = getEvent(id);
    eventDorRepository.delete(eventDor);
  }

  public EventDor updateEvent(Long id, EventDor event) {
    EventDor eventDor = getEvent(id);

    eventDor.setName(event.getName());
    eventDor.setParty(event.isParty());
    return eventDorRepository.save(eventDor);
  }
}
