package com.iseplive.api.controllers.media;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.dto.EventDTO;
import com.iseplive.api.entity.media.Event;
import com.iseplive.api.services.EventService;
import com.iseplive.api.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@RestController
@RequestMapping("/event")
public class EventController {

  @Autowired
  EventService eventService;

  @Autowired
  JsonUtils jsonUtils;

  @PostMapping
  public Event createEvent(@RequestParam("image") MultipartFile file,
                           @RequestParam("event") String event,
                           @AuthenticationPrincipal TokenPayload auth) {
    EventDTO eventDTO = jsonUtils.deserialize(event, EventDTO.class);
    return eventService.createEvent(file, eventDTO, auth);
  }

  @GetMapping
  public List<Event> getEvents() {
    return eventService.getEvents();
  }

  @GetMapping("/{id}")
  public Event getEvent(@PathVariable Long id) {
    return eventService.getEvent(id);
  }

  @PutMapping("/{id}")
  public Event updateEvent(@PathVariable Long id,
                           @RequestParam(value = "image", required = false) MultipartFile file,
                           @RequestParam("event") String event) {
    EventDTO eventDTO = jsonUtils.deserialize(event, EventDTO.class);
    return eventService.updateEvent(id, eventDTO, file);
  }
}
