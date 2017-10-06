package com.iseplive.api.controllers.media;

import com.iseplive.api.dto.EventDTO;
import com.iseplive.api.entity.media.Event;
import com.iseplive.api.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

  @PostMapping
  public Event createEvent(@RequestBody EventDTO dto) {
    return eventService.createEvent(dto);
  }
}
