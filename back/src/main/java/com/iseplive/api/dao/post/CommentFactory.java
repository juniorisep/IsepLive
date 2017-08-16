package com.iseplive.api.dao.post;

import com.iseplive.api.dto.view.CommentView;
import com.iseplive.api.entity.Comment;
import com.iseplive.api.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 16/08/2017.
 * back
 */
@Service
public class CommentFactory {

  @Autowired
  PostService postService;

  public CommentView entityToView(Comment comment) {
    CommentView commentView = new CommentView();

    commentView.setId(comment.getId());
    commentView.setCreation(comment.getCreation());
    commentView.setLikes(comment.getLike());
    commentView.setMessage(comment.getMessage());
    commentView.setPost(comment.getPost());
    commentView.setStudent(comment.getStudent());

    commentView.setLiked(postService.isCommentLiked(comment));

    return commentView;
  }
}
