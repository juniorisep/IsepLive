package com.iseplive.api.services;

import com.iseplive.api.dao.poll.PollAnswerRepository;
import com.iseplive.api.dao.poll.PollRepository;
import com.iseplive.api.dao.poll.PollVoteRepository;
import com.iseplive.api.dto.PollCreationDTO;
import com.iseplive.api.entity.media.poll.Poll;
import com.iseplive.api.entity.media.poll.PollAnswer;
import com.iseplive.api.entity.media.poll.PollVote;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.exceptions.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@Service
public class PollService {
  @Autowired
  PollRepository pollRepository;

  @Autowired
  PollAnswerRepository pollAnswerRepository;

  @Autowired
  PollVoteRepository pollVoteRepository;

  @Autowired
  StudentService studentService;

  @Autowired
  AuthService authService;

  public void addVote(Long pollId, Long pollAnswId, Long studentId) {
    Poll poll = getPoll(pollId);
    if (!poll.getMultiAnswers() && checkAlreadyVoted(pollId, studentId)) {
      throw new IllegalArgumentException("This poll has already been answered");
    }
    PollAnswer pollAnswer = pollAnswerRepository.findOne(pollAnswId);
    Student student = studentService.getStudent(studentId);
    PollVote pollVote = new PollVote();
    pollVote.setAnswer(pollAnswer);
    pollVote.setStudent(student);
    pollVoteRepository.save(pollVote);
  }

  public boolean checkAlreadyVoted(Long pollId, Long studenId) {
    return !pollVoteRepository.checkUserAnsweredPoll(pollId, studenId).isEmpty();
  }

  public Poll createPoll(PollCreationDTO pollDTO) {
    // Create poll
    Poll poll = new Poll();
    poll.setName(pollDTO.getTitle());
    poll.setEndDate(pollDTO.getEndDate());
    poll.setMultiAnswers(pollDTO.getMultiAnswers());
    Poll saved = pollRepository.save(poll);

    // Add answers
    pollDTO.getAnswers().forEach(q -> {
      PollAnswer pollAnswer = new PollAnswer();
      pollAnswer.setPoll(poll);
      pollAnswer.setContent(q);
      pollAnswerRepository.save(pollAnswer);
    });
    return pollRepository.findOne(saved.getId());
  }

  public Poll getPoll(Long pollId) {
    Poll poll = pollRepository.findOne(pollId);
    if (authService.isUserAnonymous() && poll.getPost().getPrivate()) {
      throw new AuthException("you can't access this poll");
    }
    return poll;
  }

  public List<PollVote> getVote(Long pollId, long studentId) {
    return pollVoteRepository.checkUserAnsweredPoll(pollId, studentId);
  }
}
