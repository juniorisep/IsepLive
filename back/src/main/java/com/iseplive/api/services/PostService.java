package com.iseplive.api.services;

import com.iseplive.api.dao.media.MediaRepository;
import com.iseplive.api.dao.post.PostFactory;
import com.iseplive.api.dao.post.PostRepository;
import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.Post;
import com.iseplive.api.entity.media.Media;
import javafx.geometry.Pos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostFactory postFactory;

    @Autowired
    MediaRepository mediaRepository;

    public List<Post> getPosts() {
        return postRepository.findByPublishStateOrderByCreationDateDesc(PublishStateEnum.PUBLISHED);
    }

    public Post createPost(PostDTO postDTO) {
        Post post = postFactory.dtoToEntity(postDTO);
        post.setCreationDate(new Date());
        post.setPublishState(PublishStateEnum.WAITING);
        return postRepository.save(post);
    }

    public void addPollIntegration(Long id, Long poll) {
        Post post = postRepository.findOne(id);
        Media media = mediaRepository.findOne(poll);
        post.setMedia(media);
        postRepository.save(post);
    }
}
