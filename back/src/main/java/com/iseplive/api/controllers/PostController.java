package com.iseplive.api.controllers;

import com.iseplive.api.dto.CommentDTO;
import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.Comment;
import com.iseplive.api.entity.Post;
import com.iseplive.api.services.ImageService;
import com.iseplive.api.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Guillaume on 27/07/2017.
 * back
 */
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    ImageService imageService;

    @GetMapping
    public List<Post> getPosts() {
        return postService.getPosts();
    }

    @PostMapping
    public Post addPost(@RequestBody PostDTO post) {
        return postService.createPost(post);
    }

    @PutMapping("/{id}/comment")
    public Comment commentPost(@PathVariable Long id, @RequestBody CommentDTO dto) {
        return postService.commentPost(id, dto, 1L);
    }

    @PutMapping("/{id}/like")
    public void likePost(@PathVariable Long id) {
        postService.addPostLike(id);
    }

    @PutMapping("/{id}/comment/{comId}/like")
    public void likeComment(@PathVariable Long comId) {
        postService.addCommentLike(comId);
    }

    @PutMapping("/{id}/state/{state}")
    public void setPublishState(@PathVariable("id") Long id, @PathVariable("state") PublishStateEnum state) {
        postService.setPublishState(id, state);
    }

    @PutMapping("/{id}/integration/{media}")
    public void addMediaIntegration(@PathVariable Long id, @PathVariable Long media) {
        postService.addMediaIntegration(id, media);
    }

}
