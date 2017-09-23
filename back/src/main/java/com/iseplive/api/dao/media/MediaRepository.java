package com.iseplive.api.dao.media;

import com.iseplive.api.entity.media.Media;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@Repository
public interface MediaRepository extends CrudRepository<Media, Long> {
  List<Media> findAllByMediaTypeInAndPost_Author_AuthorType(Collection<String> mediaType, String post_author_authorType);
}
