package com.iseplive.api.services;

import com.iseplive.api.dao.club.ClubFactory;
import com.iseplive.api.dao.club.ClubRepository;
import com.iseplive.api.dto.ClubDTO;
import com.iseplive.api.dto.PublishStateEnum;
import com.iseplive.api.entity.Club;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
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
    ClubFactory clubFactory;

    public Club createClub(ClubDTO dto) {
        Club club = clubFactory.dtoToEntity(dto);
        club.setPublishState(PublishStateEnum.WAITING);
        return clubRepository.save(club);
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
