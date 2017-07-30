package com.iseplive.api.dao.post;

import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.entity.Post;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Service
public class PostFactory {
    public Post dtoToEntity(PostDTO post) {
        Post p = new Post();
        p.setTitle(post.getTitle());
        p.setContent(post.getContent());
        p.setCreationDate(post.getCreationDate());
        return p;
    }
}
