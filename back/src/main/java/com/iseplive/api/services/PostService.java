package com.iseplive.api.services;

import com.iseplive.api.dao.media.MediaRepository;
import com.iseplive.api.dao.post.CommentRepository;
import com.iseplive.api.dao.post.PostFactory;
import com.iseplive.api.dao.post.PostRepository;
import com.iseplive.api.dto.CommentDTO;
import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.Comment;
import com.iseplive.api.entity.Post;
import com.iseplive.api.entity.media.Media;
import com.iseplive.api.entity.user.Student;
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
    CommentRepository commentRepository;

    @Autowired
    StudentService studentService;

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

    public void addMediaIntegration(Long id, Long mediaId) {
        Post post = postRepository.findOne(id);
        Media media = mediaRepository.findOne(mediaId);
        post.setMedia(media);
        postRepository.save(post);
    }

    public Comment commentPost(Long postId, CommentDTO dto, Long studentId) {
        Comment comment = new Comment();
        Post post = postRepository.findOne(postId);
        comment.setPost(post);
        comment.setMessage(dto.getMessage());
        Student student = studentService.getStudent(studentId);
        comment.setStudent(student);
        comment.setCreation(new Date());
        return commentRepository.save(comment);
    }

    public void setPublishState(Long id, PublishStateEnum state) {
        Post post = postRepository.findOne(id);
        post.setPublishState(state);
        postRepository.save(post);
    }

    public void addLike(Long postId) {
        Post post = postRepository.findOne(postId);
        List<Student> students = post.getLike();
        Student student = studentService.getStudent(1L);
        students.add(student);
        postRepository.save(post);
    }
}
