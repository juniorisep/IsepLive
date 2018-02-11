package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.constants.Roles;
import com.iseplive.api.dto.dor.QuestionDorDTO;
import com.iseplive.api.dto.dor.SessionDorDTO;
import com.iseplive.api.dto.dor.VoteDorDTO;
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

  @PutMapping("/vote")
  @RolesAllowed({ Roles.STUDENT })
  public VoteDor vote(@RequestBody VoteDorDTO voteDor, @AuthenticationPrincipal TokenPayload payload) {
    return dorService.handleVote(voteDor, payload);
  }
}
