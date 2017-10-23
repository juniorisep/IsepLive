package com.iseplive.api.dao.media;

import com.iseplive.api.entity.media.Media;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@Repository
public interface MediaRepository extends CrudRepository<Media, Long> {
  Page<Media> findAllByMediaTypeInAndPost_Author_AuthorTypeAndPost_isPrivateOrderByCreationDesc(
    Collection<String> mediaType, String post_author_authorType, Boolean post_isPrivate, Pageable pageable);

  Page<Media> findAllByMediaTypeInAndPost_Author_AuthorTypeOrderByCreationDesc(
    Collection<String> mediaType, String post_author_authorType, Pageable pageable);
}
