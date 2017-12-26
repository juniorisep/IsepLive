package com.iseplive.api.dao.image;

import com.iseplive.api.entity.media.Image;
import com.iseplive.api.entity.media.Matched;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Guillaume on 02/11/2017.
 * back
 */
@Repository
public interface MatchedRepository extends CrudRepository<Matched, Long> {
  List<Matched> findAllByImage(Image image);
}
