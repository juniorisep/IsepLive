package com.iseplive.api.dao.post;

import com.iseplive.api.entity.user.Author;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Guillaume on 03/08/2017.
 * back
 */
public interface AuthorRepository extends CrudRepository<Author, Long> {
}
