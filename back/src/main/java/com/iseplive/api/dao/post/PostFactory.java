package com.iseplive.api.dao.post;

import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.dto.view.PostView;
import com.iseplive.api.entity.Post;
import com.iseplive.api.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Service
public class PostFactory {

  @Autowired
  PostService postService;

  public Post dtoToEntity(PostDTO post) {
    Post p = new Post();
    p.setTitle(post.getTitle());
    p.setContent(post.getContent());
    return p;
  }

  public PostView entityToView(Post post) {
    PostView postView = new PostView();

    postView.setId(post.getId());
    postView.setTitle(post.getTitle());
    postView.setContent(post.getContent());
    postView.setCreationDate(post.getCreationDate());
    postView.setNbLikes(post.getLike().size());

    postView.setMedia(post.getMedia());
    postView.setAuthor(post.getAuthor());

    postView.setLiked(postService.isPostLiked(post));

    return postView;
  }
}
