package com.iseplive.api.dao.dor;

import com.iseplive.api.entity.dor.EventDor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 10/02/2018.
 * back
 */
@Repository
public interface EventDorRepository extends CrudRepository<EventDor, Long> {
}
