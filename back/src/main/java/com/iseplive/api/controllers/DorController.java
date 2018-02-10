package com.iseplive.api.controllers;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.constants.Roles;
import com.iseplive.api.dto.VoteDorDTO;
import com.iseplive.api.services.IsepDorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

/**
 * Created by Guillaume on 10/02/2018.
 * back
 */
@RestController
@RequestMapping("/dor")
public class DorController {

  @Autowired
  IsepDorService dorService;

  @PutMapping("/vote")
  @RolesAllowed({ Roles.STUDENT })
  public void vote(@RequestBody VoteDorDTO voteDor, @AuthenticationPrincipal TokenPayload payload) {
    dorService.handleVote(voteDor, payload);
  }
}
