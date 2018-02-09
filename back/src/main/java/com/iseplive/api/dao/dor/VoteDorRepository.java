package com.iseplive.api.dao.dor;

import com.iseplive.api.entity.dor.VoteDor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 09/02/2018.
 * back
 */
@Repository
public interface VoteDorRepository extends CrudRepository<VoteDor, Long> {

}
