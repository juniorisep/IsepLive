package com.iseplive.api.controllers.media;

import com.iseplive.api.dto.PollCreationDTO;
import com.iseplive.api.entity.media.poll.Poll;
import com.iseplive.api.entity.media.poll.PollVote;
import com.iseplive.api.services.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@RestController
@RequestMapping("/poll")
public class PollController {

  @Autowired
  PollService pollService;

  @GetMapping("/{id}")
  public Poll getPoll(@PathVariable Long id) {
    return pollService.getPoll(id);
  }

  /**
   * Check if poll has been answered
   *
   * @param id
   * @return
   */
  @GetMapping("/{id}/vote")
  public List<PollVote> getVote(@PathVariable Long id, @AuthenticationPrincipal Long studId) {
    return pollService.getVote(id, studId);
  }

  @PutMapping("/{id}/answer/{answerId}") // add student
  public void vote(@PathVariable Long id, @PathVariable Long answerId, @AuthenticationPrincipal Long studId) {
    pollService.addVote(id, answerId, studId);
  }

  @PostMapping
  public Poll createPoll(@RequestBody PollCreationDTO dto) {
    return pollService.createPoll(dto);
  }
}
