package com.iseplive.api.services;

import com.iseplive.api.dao.media.MediaRepository;
import com.iseplive.api.dao.post.AuthorRepository;
import com.iseplive.api.dao.post.CommentRepository;
import com.iseplive.api.dao.post.PostFactory;
import com.iseplive.api.dao.post.PostRepository;
import com.iseplive.api.dto.CommentDTO;
import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.Comment;
import com.iseplive.api.entity.Post;
import com.iseplive.api.entity.media.Media;
import com.iseplive.api.entity.user.Author;
import com.iseplive.api.entity.user.Student;
import javafx.geometry.Pos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Set;

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

    @Autowired
    AuthorRepository authorRepository;

    public List<Post> getPosts() {
        return postRepository.findByPublishStateOrderByCreationDateDesc(PublishStateEnum.PUBLISHED);
    }

    public Post createPost(PostDTO postDTO) {
        Post post = postFactory.dtoToEntity(postDTO);
        post.setAuthor(authorRepository.findOne(postDTO.getAuthorId()));
        post.setCreationDate(new Date());
        post.setPublishState(PublishStateEnum.WAITING);
        return postRepository.save(post);
    }

    public void addMediaEmbed(Long id, Long mediaId) {
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

    public void addPostLike(Long postId) {
        Post post = postRepository.findOne(postId);
        Set<Student> students = post.getLike();
        Student student = studentService.getStudent(1L);
        students.add(student);
        postRepository.save(post);
    }

    public void addCommentLike(Long comId) {
        Comment comment = commentRepository.findOne(comId);
        Set<Student> students = comment.getLike();
        Student student = studentService.getStudent(1L);
        students.add(student);
        commentRepository.save(comment);
    }

    public Post getPost(Long postId) {
        Post post = postRepository.findOne(postId);
        if (post == null) {
            throw new IllegalArgumentException("Could not find a post with id: "+postId);
        }
        return post;
    }
}
