package com.iseplive.api.dao.poll;

import com.iseplive.api.entity.media.poll.PollVote;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@Repository
public interface PollVoteRepository extends CrudRepository<PollVote, Long> {
  @Query("FROM PollVote WHERE answer.poll.id = ?1 AND student.id = ?2")
  List<PollVote> checkUserAnsweredPoll(Long pollId, Long studentId);
}
