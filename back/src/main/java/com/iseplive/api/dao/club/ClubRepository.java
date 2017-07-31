package com.iseplive.api.dao.club;

import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.club.Club;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Repository
public interface ClubRepository extends CrudRepository<Club, Long> {
    List<Club> findByPublishStateOrderByName(PublishStateEnum publishState);
}
