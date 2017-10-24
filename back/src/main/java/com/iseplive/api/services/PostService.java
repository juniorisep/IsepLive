package com.iseplive.api.services;

import com.iseplive.api.exceptions.IllegalArgumentException;
import com.iseplive.api.constants.PublishStateEnum;
import com.iseplive.api.dao.media.MediaRepository;
import com.iseplive.api.dao.post.*;
import com.iseplive.api.dto.CommentDTO;
import com.iseplive.api.dto.PostDTO;
import com.iseplive.api.dto.view.CommentView;
import com.iseplive.api.dto.view.PostView;
import com.iseplive.api.entity.Comment;
import com.iseplive.api.entity.Post;
import com.iseplive.api.entity.media.Media;
import com.iseplive.api.entity.user.Author;
import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Service
public class PostService {

  @Autowired
  AuthService authService;

  @Autowired
  PostRepository postRepository;

  @Autowired
  PostFactory postFactory;

  @Autowired
  CommentFactory commentFactory;

  @Autowired
  CommentRepository commentRepository;

  @Autowired
  StudentService studentService;

  @Autowired
  MediaRepository mediaRepository;

  @Autowired
  AuthorRepository authorRepository;

  @Autowired
  ClubService clubService;

  public Pageable createPage(int page) {
    return new PageRequest(page, 5);
  }

  public Page<PostView> getPosts(int page) {
    Page<Post> posts = postRepository.findByPublishStateAndIsPinnedOrderByCreationDateDesc(PublishStateEnum.PUBLISHED, false, createPage(page));
    return posts.map(post -> postFactory.entityToView(post));
  }

  public Page<PostView> getPublicPosts(int page) {
    Page<Post> posts = postRepository.findByPublishStateAndIsPinnedAndIsPrivateOrderByCreationDateDesc(PublishStateEnum.PUBLISHED, false, false, createPage(page));
    return posts.map(post -> postFactory.entityToView(post));
  }

  public List<PostView> getPinnedPosts() {
    List<Post> posts = postRepository.findByPublishStateAndIsPinnedOrderByCreationDateDesc(PublishStateEnum.PUBLISHED, true);
    return posts.stream().map(post -> postFactory.entityToView(post)).collect(Collectors.toList());
  }

  public List<PostView> getPublicPinnedPosts() {
    List<Post> posts = postRepository.findByPublishStateAndIsPinnedAndIsPrivateOrderByCreationDateDesc(PublishStateEnum.PUBLISHED, true, false);
    return posts.stream().map(post -> postFactory.entityToView(post)).collect(Collectors.toList());
  }

  public Post createPost(PostDTO postDTO) {
    Post post = postFactory.dtoToEntity(postDTO);
    // TODO: check if authorId is allowed to be used by the user logged in
    post.setAuthor(authorRepository.findOne(postDTO.getAuthorId()));
    post.setCreationDate(new Date());
    post.setPublishState(PublishStateEnum.WAITING);
    return postRepository.save(post);
  }

  public List<CommentView> getComments(Long postId) {
    Post post = getPost(postId);
    return post.getComments()
      .stream()
      .map(c -> commentFactory.entityToView(c))
      .collect(Collectors.toList());
  }

  public void deletePost(Long postId) {
    Post post = getPost(postId);
    // TODO: delete the ressource associated to the media (stored on disk)
    postRepository.delete(postId);
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

  public void togglePostLike(Long postId) {
    Post post = postRepository.findOne(postId);
    Set<Student> students = post.getLike();
    Student student = studentService.getStudent(1L);

    if (students.contains(student)) {
      students.remove(student);
      postRepository.save(post);
    } else {
      students.add(student);
      postRepository.save(post);
    }
  }

  public void toggleCommentLike(Long comId) {
    Comment comment = commentRepository.findOne(comId);
    Set<Student> students = comment.getLike();
    Student student = studentService.getStudent(1L);
    if (students.contains(student)) {
      students.remove(student);
      commentRepository.save(comment);
    } else {
      students.add(student);
      commentRepository.save(comment);
    }
  }

  public Post getPost(Long postId) {
    Post post = postRepository.findOne(postId);
    if (post == null) {
      throw new IllegalArgumentException("Could not find a post with id: " + postId);
    }
    return post;
  }

  public void setPinnedPost(Long id, Boolean pinned) {
    Post post = getPost(id);
    post.setPinned(pinned);
    postRepository.save(post);
  }

  public List<Author> getAuthors(Long studId) {
    List<Author> authors = new ArrayList<>();
    Student student = studentService.getStudent(studId);
    authors.add(student);
    authors.addAll(clubService.getClubAuthors(student));
    return authors;
  }

  public Boolean isPostLiked(Post post) {
    if (authService.isUserAnonymous()) return false;
    Student student = authService.getLoggedUser();
    return post.getLike().contains(student);
  }

  public Boolean isCommentLiked(Comment comment) {
    if (authService.isUserAnonymous()) return false;
    Student student = authService.getLoggedUser();
    return comment.getLike().contains(student);
  }

  public PostView getPostView(Long id) {
    Post post = getPost(id);
    if (post.getPrivate() && authService.isUserAnonymous()) {
      return null;
    }
    return postFactory.entityToView(post);
  }

  public List<PostView> getPostsAuthor(Long id) {
    List<Post> posts =  postRepository.findByAuthorIdOrderByCreationDateDesc(id);
    return posts.stream()
      .map(p -> postFactory.entityToView(p))
      .collect(Collectors.toList());
  }
}
