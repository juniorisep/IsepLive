package com.iseplive.api.dao.event;

import com.iseplive.api.entity.media.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Repository
public interface EventRepository extends CrudRepository<Event, Long> {
}
