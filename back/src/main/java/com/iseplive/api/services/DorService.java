package com.iseplive.api.services;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.constants.ConfigKeys;
import com.iseplive.api.dao.config.ConfigRepository;
import com.iseplive.api.dao.dor.EventDorRepository;
import com.iseplive.api.dao.dor.QuestionDorRepository;
import com.iseplive.api.dao.dor.SessionDorRepository;
import com.iseplive.api.dao.dor.VoteDorRepository;
import com.iseplive.api.dao.employee.EmployeeFactory;
import com.iseplive.api.dao.employee.EmployeeRepository;
import com.iseplive.api.dao.post.AuthorRepository;
import com.iseplive.api.dto.EmployeeDTO;
import com.iseplive.api.dto.dor.DorConfigDTO;
import com.iseplive.api.dto.dor.QuestionDorDTO;
import com.iseplive.api.dto.dor.SessionDorDTO;
import com.iseplive.api.dto.dor.VoteDorDTO;
import com.iseplive.api.dto.view.AnswerDorDTO;
import com.iseplive.api.dto.view.AnswerDorType;
import com.iseplive.api.entity.Config;
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
import com.iseplive.api.utils.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Guillaume on 09/02/2018.
 * back
 */
@Service
public class DorService {

  private Logger LOG = LoggerFactory.getLogger(DorService.class);

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
  EmployeeRepository employeeRepository;

  @Autowired
  ConfigRepository configRepository;

  @Autowired
  EmployeeFactory employeeFactory;

  @Autowired
  StudentService studentService;

  @Autowired
  JsonUtils jsonUtils;

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

  public List<EventDor> searchEvent(String name) {
    return eventDorRepository.findAllByNameContainingIgnoreCase(name);
  }

  /**
   * Compute the top three candidates of the second turn for each
   * question of a particular session
   * @param sessionId
   * @return
   */
  public Map<Long, List<AnswerDorDTO>> computeFirstRoundWinners(Long sessionId) {
    List<VoteDor> voteDors = voteDorRepository.findAllBySession_IdAndRound(sessionId, 1);
    Map<QuestionDor, List<AnswerDorDTO>> frWinners = new HashMap<>();
    Map<Long, List<AnswerDorDTO>> answersMap = new HashMap<>();
    for (VoteDor voteDor: voteDors) {
      frWinners.computeIfAbsent(voteDor.getQuestionDor(), k -> new ArrayList<>());
      AnswerDorDTO answerDorDTO = voteToAnswerDTO(voteDor);
      frWinners.get(voteDor.getQuestionDor()).add(answerDorDTO);
    }

    for (QuestionDor questionDor: frWinners.keySet()) {
      Map<String, Long> grouped = new HashMap<>();
      Map<String, AnswerDorDTO> mapping = new HashMap<>();
      for (AnswerDorDTO answerDorDTO: frWinners.get(questionDor)) {
        if (grouped.get(answerDorDTO.getName()) != null) {
          grouped.put(answerDorDTO.getName(), grouped.get(answerDorDTO.getName()) + 1);
        } else {
          mapping.put(answerDorDTO.getName(), answerDorDTO);
          grouped.put(answerDorDTO.getName(), 1L);
        }
      }

      for (String key: grouped.keySet()) {
        mapping.get(key).setScore(grouped.get(key));
      }
      List<AnswerDorDTO> answers = new ArrayList<>(mapping.values());
      answers.sort(Comparator.comparingLong(AnswerDorDTO::getScore));
      Collections.reverse(answers);
      List<AnswerDorDTO> answerSelection = answers.stream()
        .limit(3).collect(Collectors.toList());
      frWinners.put(questionDor, answerSelection);
      answersMap.put(questionDor.getId(), answerSelection);
    }
    return answersMap;
  }

  public AnswerDorDTO voteToAnswerDTO(VoteDor voteDor) {
    if (voteDor.getResAuthor() != null) {
      return new AnswerDorDTO(voteDor.getResAuthor().getId(), AnswerDorType.USER, voteDor);
    }
    if (voteDor.getResEvent() != null) {
      return new AnswerDorDTO(voteDor.getResEvent().getId(), AnswerDorType.EVENT, voteDor);
    }
    return null;
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

    if (voteDor.getEventID() != null) {
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

  public SessionDor getCurrentSession() {
    return sessionDorRepository.findByEnabled(true);
  }

  private int getRound(SessionDor sessionDor) {
    Date now = new Date();
    if (sessionDor.getSecondTurn().after(now)) {
      return 1;
    }

    if (sessionDor.getResult().after(now)) {
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

    if (sessionDor.getFirstTurn().before(now)) {
      // if it is the first turn
      if (sessionDor.getSecondTurn().after(now)) {
        return voteDorRepository.findAllByRoundAndStudentIdAndQuestionDorAndSession(1, userID, questionDor, sessionDor);
      }

      // if it is the second turn
      if (sessionDor.getResult().after(now)) {
        return voteDorRepository.findAllByRoundAndStudentIdAndQuestionDorAndSession(2, userID, questionDor, sessionDor);
      }
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

  /**
   * Get the current votes of a user during a round
   * @param userId
   * @param round
   * @return
   */
  public List<VoteDor> getCurrentVotes(Long userId, int round) {
    SessionDor sessionDor = getCurrentSession();
    if (sessionDor != null) {
      return voteDorRepository.findAllByStudent_IdAndSessionAndRound(userId, sessionDor, round);
    }
    return new ArrayList<>();
  }

  /**
   * Search for an employee
   * @param name
   * @return
   */
  public List<Employee> searchEmployee(String name) {
    return employeeRepository.searchEmployeesByName(name);
  }

  /**
   * List all of the employees
   * @return
   */
  public List<Employee> getEmployees() {
    return employeeRepository.findAll();
  }

  /**
   * Create a new Employee
   * @param employeeDTO
   * @return
   */
  public Employee createEmployee(EmployeeDTO employeeDTO) {
    Employee employee = employeeFactory.dtoToEntity(employeeDTO);
    return employeeRepository.save(employee);
  }

  public Employee updateEmployee(Long id, EmployeeDTO employeeDTO) {
    Employee employee = employeeRepository.findOne(id);
    if (employee != null) {
      employee.setFirstname(employeeDTO.getFirstname());
      employee.setLastname(employeeDTO.getLastname());
      return employeeRepository.save(employee);
    }
    throw new NotFoundException("could not find this employee");
  }

  public void deleteEmployee(Long id) {
    Employee employee = employeeRepository.findOne(id);
    if (employee != null) {
      employeeRepository.delete(employee);
    }
    throw new NotFoundException("could not find this employee");
  }

  public void updateDorConfig(MultipartFile photo, String configValue) {
    Config dorConfig = configRepository.findByKeyName(ConfigKeys.DOR_CONFIG);
    if (dorConfig == null) {
      dorConfig = new Config();
      dorConfig.setKeyName(ConfigKeys.DOR_CONFIG);
    }
    // Test if we can read config
    jsonUtils.deserialize(configValue, DorConfigDTO.class);
    dorConfig.setValue(configValue);
    configRepository.save(dorConfig);
  }

  public DorConfigDTO readDorConfig() {
    Config dorConfig = configRepository.findByKeyName(ConfigKeys.DOR_CONFIG);
    return jsonUtils.deserialize(dorConfig.getValue(), DorConfigDTO.class);
  }

}
