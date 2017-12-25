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

import java.util.List;

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

  private final int WIDTH_EVENT_IMAGE = 1024;

  public Event createEvent(MultipartFile image, EventDTO dto, TokenPayload auth) {
    Event event = eventFactory.dtoToEntity(dto);
    Club club = clubService.getClub(dto.getClubId());
    if (club == null) {
      throw new IllegalArgumentException("Could not find a club with id: " + dto.getClubId());
    }
    event.setClub(club);

    String eventPath = createImageEvent(image);

    event.setImageUrl(mediaUtils.getPublicUrlImage(eventPath));
    return eventRepository.save(event);
  }

  private String createImageEvent(MultipartFile image) {
    String random = mediaUtils.randomName();
    String eventPath = mediaUtils.resolvePath(
      eventBaseUrl, random, false);
    mediaUtils.saveJPG(image, WIDTH_EVENT_IMAGE, eventPath);
    return eventPath;
  }

  public List<Event> getEvents() {
    return eventRepository.findAll();
  }

  public Event getEvent(Long id) {
    Event event = eventRepository.findOne(id);
    if (event == null) {
      throw new IllegalArgumentException("could not find event with id: "+id);
    }
    return event;
  }

  public Event updateEvent(Long id, EventDTO eventDTO, MultipartFile file) {
    Event event = getEvent(id);

    event.setTitle(eventDTO.getTitle());
    event.setDescription(eventDTO.getDescription());
    event.setLocation(eventDTO.getLocation());
    event.setDate(eventDTO.getDate());

    if (file != null) {
      String eventPath = createImageEvent(file);
      mediaUtils.removeIfExistPublic(event.getImageUrl());
      event.setImageUrl(mediaUtils.getPublicUrlImage(eventPath));
    }

    return eventRepository.save(event);
  }

  public void removeEvent(Long id) {
    Event event = getEvent(id);
    mediaUtils.removeIfExistPublic(event.getImageUrl());
    eventRepository.delete(id);
  }
}
