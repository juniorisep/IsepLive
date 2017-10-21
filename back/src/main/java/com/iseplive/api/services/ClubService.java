package com.iseplive.api.services;

import com.iseplive.api.conf.IllegalArgumentException;
import com.iseplive.api.dao.club.ClubFactory;
import com.iseplive.api.dao.club.ClubMemberRepository;
import com.iseplive.api.dao.club.ClubRepository;
import com.iseplive.api.dao.club.ClubRoleRepository;
import com.iseplive.api.dao.post.AuthorRepository;
import com.iseplive.api.dto.ClubDTO;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.club.ClubMember;
import com.iseplive.api.entity.club.ClubRole;
import com.iseplive.api.entity.user.Student;
import com.iseplive.api.utils.MediaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Service
public class ClubService {

  @Autowired
  AuthorRepository authorRepository;

  @Autowired
  ClubRepository clubRepository;

  @Autowired
  ClubRoleRepository clubRoleRepository;

  @Autowired
  ClubMemberRepository clubMemberRepository;

  @Autowired
  ClubFactory clubFactory;

  @Autowired
  StudentService studentService;

  @Autowired
  MediaUtils imageUtils;

  @Value("${storage.club.url}")
  public String clubLogoStorage;

  public Club createClub(ClubDTO dto) {
    Club club = clubFactory.dtoToEntity(dto);
    if (dto.getAdminId() == null) {
      throw new IllegalArgumentException("The id of the admin cannot be null");
    }
    Student admin = studentService.getStudent(dto.getAdminId());
    if (admin == null) {
      throw new IllegalArgumentException("this student id doesn't exist");
    }
    club.setAdmins(Collections.singletonList(admin));
    return authorRepository.save(club);
  }

  public Club setClubLogo(MultipartFile file, Long clubId) {
    Club club = getClub(clubId);
    String path = imageUtils.resolvePath(clubLogoStorage, club.getName(), false);
    imageUtils.saveJPG(file, 256, path);
    club.setLogoUrl(imageUtils.getPublicUrlImage(path));
    return authorRepository.save(club);
  }

  public ClubMember addMember(Long clubId, Long roleId, Long studentId) {
    ClubMember clubMember = new ClubMember();
    clubMember.setClub(getClub(clubId));
    clubMember.setMember(studentService.getStudent(studentId));
    clubMember.setRole(getClubRole(roleId));

    return clubMemberRepository.save(clubMember);
  }

  private ClubRole getClubRole(Long id) {
    return clubRoleRepository.findOne(id);
  }

  public List<Club> getAll() {
    return clubRepository.findAllByOrderByName();
  }

  public Club getClub(Long id) {
    Club club = clubRepository.findOne(id);
    if (club == null) throw new IllegalArgumentException("could not find club with id: " + id);
    return club;
  }

  /**
   * Retrieve the list of clubs where the student is admin
   *
   * @param student student id
   * @return a club list
   */
  public List<Club> getClubAuthors(Student student) {
    return clubRepository.findByAdminsContains(student);
  }

  public void deleteClub(Long id) {
    clubRepository.delete(id);
  }

  public List<ClubMember> getMembers(Long id) {
    return clubMemberRepository.findByClubId(id);
  }

  public ClubRole createRole(String role) {
    ClubRole clubRole = new ClubRole();
    clubRole.setName(role);
    return clubRoleRepository.save(clubRole);
  }

  public List<Student> getAdmins(Long clubId) {
    Club club = getClub(clubId);
    return club.getAdmins();
  }

  public void addAdmin(Long clubId, Long studId) {
    Student student = studentService.getStudent(studId);
    Club club = getClub(clubId);
    club.getAdmins().add(student);
    clubRepository.save(club);
  }

  public void removeAdmin(Long clubId, Long studId) {
    Club club = getClub(clubId);
    Student student = studentService.getStudent(studId);
    boolean removed = club.getAdmins().remove(student);
    if (!removed) {
      throw new IllegalArgumentException("This student is not admin on the club with id: " + clubId);
    }
    clubRepository.save(club);
  }

  public List<Club> getAdminClubs(Student student) {
    return clubRepository.findByAdminsContains(student);
  }
}
