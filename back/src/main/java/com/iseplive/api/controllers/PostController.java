package com.iseplive.api.controllers;

import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.entity.Post;
import com.iseplive.api.services.ImageService;
import com.iseplive.api.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/test")
    public void uploadImage(@RequestParam("file") MultipartFile file) {
        imageService.uploadFile(file);
    }
}
