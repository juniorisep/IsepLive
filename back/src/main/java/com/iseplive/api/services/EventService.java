package com.iseplive.api.services;

import com.iseplive.api.exceptions.IllegalArgumentException;
import com.iseplive.api.dao.event.EventFactory;
import com.iseplive.api.dao.event.EventRepository;
import com.iseplive.api.dto.EventDTO;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.media.Event;
import com.iseplive.api.entity.media.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class EventService {
  @Autowired
  EventRepository eventRepository;

  @Autowired
  EventFactory eventFactory;

  @Autowired
  ClubService clubService;

  @Autowired
  ImageService imageService;

  @Value("${storage.event.url}")
  String eventBaseUrl;

  public Event createEvent(EventDTO dto) {
    Event event = eventFactory.dtoToEntity(dto);
    Club club = clubService.getClub(dto.getClubId());
    if (club == null) {
      throw new IllegalArgumentException("Could not find a club with id: " + dto.getClubId());
    }
    event.setClub(club);
    if (dto.getImageId() != null) {
      Image image = imageService.getImage(dto.getImageId());
      event.setImage(image);
    }
    return eventRepository.save(event);
  }
}
