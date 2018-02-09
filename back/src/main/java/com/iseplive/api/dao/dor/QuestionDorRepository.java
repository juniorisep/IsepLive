package com.iseplive.api.dao.dor;

import com.iseplive.api.entity.dor.QuestionDor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 09/02/2018.
 * back
 */
@Repository
public interface QuestionDorRepository extends CrudRepository<QuestionDor, Long> {

}
