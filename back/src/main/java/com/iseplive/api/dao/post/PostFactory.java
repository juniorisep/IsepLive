package com.iseplive.api.dao.post;

import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.dto.view.PostView;
import com.iseplive.api.entity.Post;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.services.AuthService;
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

  @Autowired
  AuthService authService;

  public Post dtoToEntity(PostDTO post) {
    Post p = new Post();
    p.setTitle(post.getTitle());
    p.setContent(post.getContent());
    p.setPrivate(post.getPrivate());
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
    if (authService.isUserAnonymous()) {
      postView.setHasWriteAccess(false);
    } else {
      Student user = authService.getLoggedUser();
      if (post.getAuthor() instanceof Club) {
        boolean isAdmin = (((Club) post.getAuthor()).getAdmins().contains(user));
        postView.setHasWriteAccess(isAdmin);
      }

      if (post.getAuthor() instanceof Student) {
        postView.setHasWriteAccess(post.getAuthor().equals(user));
      }
    }

    return postView;
  }
}
