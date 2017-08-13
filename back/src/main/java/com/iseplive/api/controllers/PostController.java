package com.iseplive.api.controllers;

import com.iseplive.api.constants.PublishStateEnum;
import com.iseplive.api.dto.CommentDTO;
import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.dto.view.PostView;
import com.iseplive.api.entity.Comment;
import com.iseplive.api.entity.Post;
import com.iseplive.api.entity.user.Author;
import com.iseplive.api.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping
    public Page<PostView> getPosts(@RequestParam(defaultValue = "0") int page) {
        return postService.getPosts(page);
    }

    @PostMapping
    public Post createPost(@RequestBody PostDTO post) {
        return postService.createPost(post);
    }

    @GetMapping("/pinned")
    public List<Post> getPinnedPosts() {
        return postService.getPinnedPosts();
    }

    @GetMapping("/authors")
    public List<Author> getAuthors(@AuthenticationPrincipal Long studentId) {
        return postService.getAuthors(studentId);
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        return postService.getPost(id);
    }

    @PutMapping("/{id}/pinned/{pinned}")
    public void updatePost(@PathVariable Long id, @PathVariable Boolean pinned) {
        postService.setPinnedPost(id, pinned);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    @GetMapping("/{id}/comment")
    public List<Comment> getComments(@PathVariable Long id) {
        return postService.getComments(id);
    }

    @PutMapping("/{id}/comment")
    public Comment commentPost(@PathVariable Long id, @RequestBody CommentDTO dto) {
        return postService.commentPost(id, dto, 1L);
    }

    @PutMapping("/{id}/like")
    public void likePost(@PathVariable Long id) {
        postService.togglePostLike(id);
    }

    @PutMapping("/{id}/comment/{comId}/like")
    public void likeComment(@PathVariable Long comId) {
        postService.toggleCommentLike(comId);
    }

    @PutMapping("/{id}/state/{state}")
    public void setPublishState(@PathVariable("id") Long id, @PathVariable("state") PublishStateEnum state) {
        postService.setPublishState(id, state);
    }

    @PutMapping("/{id}/embed/{media}")
    public void addMediaEmbed(@PathVariable Long id, @PathVariable Long media) {
        postService.addMediaEmbed(id, media);
    }

}
