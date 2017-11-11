package com.iseplive.api.dao.image;

import com.iseplive.api.entity.media.Matched;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 02/11/2017.
 * back
 */
@Repository
public interface MatchedRepository extends CrudRepository<Matched, Long> {
}
