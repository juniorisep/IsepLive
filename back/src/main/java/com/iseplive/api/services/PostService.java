package com.iseplive.api.services;

import com.iseplive.api.dao.post.PostFactory;
import com.iseplive.api.dao.post.PostRepository;
import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    public Post createPost(PostDTO postDTO) {
        Post post = postFactory.dtoToEntity(postDTO);
        return postRepository.save(post);
    }
}
