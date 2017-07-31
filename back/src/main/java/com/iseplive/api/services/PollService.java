package com.iseplive.api.services;

import com.iseplive.api.dao.poll.PollQuestionRepository;
import com.iseplive.api.dao.poll.PollRepository;
import com.iseplive.api.dao.poll.PollVoteRepository;
import com.iseplive.api.dto.PollCreationDTO;
import com.iseplive.api.entity.poll.Poll;
import com.iseplive.api.entity.poll.PollQuestion;
import com.iseplive.api.entity.poll.PollVote;
import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    PollQuestionRepository pollQuestionRepository;

    @Autowired
    PollVoteRepository pollVoteRepository;

    @Autowired
    StudentService studentService;

    public void addVote(Long pollQuestId, Long studentId) {
        PollQuestion pollQuestion = pollQuestionRepository.findOne(pollQuestId);
        Student student = studentService.getStudent(studentId);
        PollVote pollVote = new PollVote();
        pollVote.setQuestion(pollQuestion);
        pollVote.setStudent(student);
        pollVoteRepository.save(pollVote);
    }

    public Poll createPoll(PollCreationDTO pollDTO) {
        // Create poll
        Poll poll = new Poll();
        poll.setName(pollDTO.getTitle());
        Poll saved = pollRepository.save(poll);

        // Add questions
        pollDTO.getQuestions().forEach(q -> {
            PollQuestion pollQuestion = new PollQuestion();
            pollQuestion.setPoll(poll);
            pollQuestion.setContent(q);
            pollQuestionRepository.save(pollQuestion);
        });
        return pollRepository.findOne(saved.getId());
    }

    public Poll getPoll(Long pollId) {
        return pollRepository.findOne(pollId);
    }

}
