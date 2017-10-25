package com.iseplive.api.services;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.dao.event.EventFactory;
import com.iseplive.api.dao.event.EventRepository;
import com.iseplive.api.dto.EventDTO;
import com.iseplive.api.entity.club.Club;
import com.iseplive.api.entity.media.Event;
import com.iseplive.api.exceptions.IllegalArgumentException;
import com.iseplive.api.utils.MediaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

  @Autowired
  MediaUtils mediaUtils;

  @Value("${storage.event.url}")
  String eventBaseUrl;

  public Event createEvent(MultipartFile image, EventDTO dto, TokenPayload auth) {
    Event event = eventFactory.dtoToEntity(dto);
    Club club = clubService.getClub(dto.getClubId());
    if (club == null) {
      throw new IllegalArgumentException("Could not find a club with id: " + dto.getClubId());
    }
    event.setClub(club);

    String random = mediaUtils.randomName();
    String eventPath = mediaUtils.resolvePath(
      eventBaseUrl, random + ".jpg", false);
    mediaUtils.saveJPG(image, 512, eventPath);

    event.setImageUrl(mediaUtils.getPublicUrlImage(eventPath));
    return eventRepository.save(event);
  }
}
