package com.iseplive.api.dao.poll;

import com.iseplive.api.entity.poll.PollQuestion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@Repository
public interface PollQuestionRepository extends CrudRepository<PollQuestion, Long> {
}
