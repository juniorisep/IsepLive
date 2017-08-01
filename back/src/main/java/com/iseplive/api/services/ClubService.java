package com.iseplive.api.services;

import com.iseplive.api.conf.IllegalArgumentException;
import com.iseplive.api.dao.club.ClubFactory;
import com.iseplive.api.dao.club.ClubMemberRepository;
import com.iseplive.api.dao.club.ClubRepository;
import com.iseplive.api.dao.club.ClubRoleRepository;
import com.iseplive.api.dto.ClubDTO;
import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.club.ClubMember;
import com.iseplive.api.entity.club.ClubRole;
import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Service
public class ClubService {

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
    ImageUtils imageUtils;

    @Value("${storage.club.url}")
    public String clubLogoStorage;

    public Club createClub(ClubDTO dto) {
        Club club = clubFactory.dtoToEntity(dto);
        club.setPublishState(PublishStateEnum.WAITING);
        if (dto.getAdminId() == null) {
            throw new IllegalArgumentException("The id of the admin cannot be null");
        }
        Student admin = studentService.getStudent(dto.getAdminId());
        if (admin == null) {
            throw new IllegalArgumentException("this student id doesn't exist");
        }
        club.setAdmin(admin);
        return clubRepository.save(club);
    }

    public Club setClubLogo(MultipartFile file, Long clubId) {
        Club club = clubRepository.findOne(clubId);
        String path = imageUtils.resolvePath(clubLogoStorage, club.getName(), false);
        imageUtils.saveJPG(file, 256, path);
        club.setLogoUrl(imageUtils.getPublicUrl(path));
        return clubRepository.save(club);
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

    public void setPublishState(Long id, PublishStateEnum state) {
        Club club = clubRepository.findOne(id);
        club.setPublishState(state);
        clubRepository.save(club);
    }

    public List<Club> getAll() {
        return clubRepository.findByPublishStateOrderByName(PublishStateEnum.PUBLISHED);
    }

    public Club getClub(Long id) {
        return clubRepository.findOne(id);
    }

    public void deleteClub(Long id) {
        clubRepository.delete(id);
    }
}
