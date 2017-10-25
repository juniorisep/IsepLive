package com.iseplive.api.controllers.media;

import com.iseplive.api.conf.jwt.TokenPayload;
import com.iseplive.api.dto.EventDTO;
import com.iseplive.api.entity.media.Event;
import com.iseplive.api.services.EventService;
import com.iseplive.api.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
}
