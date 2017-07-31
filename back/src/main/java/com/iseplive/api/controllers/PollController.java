package com.iseplive.api.controllers;

import com.iseplive.api.dto.PollCreationDTO;
import com.iseplive.api.entity.poll.Poll;
import com.iseplive.api.services.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/question/{id}") // add student
    public void vote(@PathVariable Long id) {
        pollService.addVote(id, 1L);
    }

    @PostMapping
    public Poll createPoll(@RequestBody PollCreationDTO dto) {
        return pollService.createPoll(dto);
    }
}
