package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.constants.Roles;
import com.iseplive.api.dto.dor.QuestionDorDTO;
import com.iseplive.api.dto.dor.SessionDorDTO;
import com.iseplive.api.dto.dor.VoteDorDTO;
import com.iseplive.api.entity.dor.EventDor;
import com.iseplive.api.entity.dor.QuestionDor;
import com.iseplive.api.entity.dor.SessionDor;
import com.iseplive.api.entity.dor.VoteDor;
import com.iseplive.api.services.DorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

/**
 * Created by Guillaume on 10/02/2018.
 * back
 */
@RestController
@RequestMapping("/dor")
public class DorController {

  @Autowired
  DorService dorService;

  @PostMapping("/session")
  @RolesAllowed({ Roles.ADMIN })
  public SessionDor createSession(@RequestBody SessionDorDTO sessionDorDTO) {
    return dorService.createSession(sessionDorDTO);
  }

  @GetMapping("/session")
  @RolesAllowed({ Roles.STUDENT })
  public List<SessionDor> getSessions() {
    return dorService.getSessions();
  }

  @DeleteMapping("/session/{id}")
  @RolesAllowed({ Roles.ADMIN })
  public void deleteSession(@PathVariable Long id) {
    dorService.deleteSession(id);
  }

  @PutMapping("/session/{id}")
  @RolesAllowed({ Roles.ADMIN })
  public void updateSession(@PathVariable Long id, @RequestBody SessionDor dorSession) {
    dorService.updateSession(id, dorSession);
  }

  @PutMapping("/session/{id}/enable")
  @RolesAllowed({ Roles.ADMIN })
  public void toggleEnableSession(@PathVariable Long id) {
    dorService.toggleSession(id);
  }

  @GetMapping("/question")
  @RolesAllowed({ Roles.STUDENT })
  public List<QuestionDor> getQuestions() {
    return dorService.getQuestions();
  }

  @PostMapping("/question")
  @RolesAllowed({ Roles.ADMIN })
  public QuestionDor createQuestion(@RequestBody QuestionDorDTO questionDorDTO) {
    return dorService.createQuestion(questionDorDTO);
  }

  @PutMapping("/question/{id}")
  @RolesAllowed({ Roles.ADMIN })
  public QuestionDor updateQuestion(@PathVariable Long id, @RequestBody QuestionDor questionDor) {
    return dorService.updateQuestion(id, questionDor);
  }

  @DeleteMapping("/question/{id}")
  @RolesAllowed({ Roles.ADMIN })
  public void deleteQuestion(@PathVariable Long id) {
    dorService.deleteQuestion(id);
  }

  @PutMapping("/vote")
  @RolesAllowed({ Roles.STUDENT })
  public VoteDor vote(@RequestBody VoteDorDTO voteDor, @AuthenticationPrincipal TokenPayload payload) {
    return dorService.handleVote(voteDor, payload);
  }

  @GetMapping("/event")
  @RolesAllowed({ Roles.STUDENT })
  public List<EventDor> getEvents() {
    return dorService.getEvents();
  }

  @PostMapping("/event")
  @RolesAllowed({ Roles.ADMIN })
  public EventDor createEvent(@RequestBody EventDor event) {
    return dorService.createEvent(event);
  }

  @DeleteMapping("/event/{id}")
  @RolesAllowed({ Roles.ADMIN })
  public void deleteEvent(@PathVariable Long id) {
    dorService.deleteEvent(id);
  }

  @PutMapping("/event/{id}")
  @RolesAllowed({ Roles.ADMIN })
  public EventDor updateEvent(@PathVariable Long id, @RequestBody EventDor event) {
    return dorService.updateEvent(id, event);
  }
}
