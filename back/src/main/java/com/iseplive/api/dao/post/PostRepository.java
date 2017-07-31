package com.iseplive.api.dao.post;

import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Repository
public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findAll();
    List<Post> findByPublishStateOrderByCreationDateDesc(PublishStateEnum publishState);
}
