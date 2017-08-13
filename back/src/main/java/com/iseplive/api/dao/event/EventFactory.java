package com.iseplive.api.dao.event;

import com.iseplive.api.dto.EventDTO;
import com.iseplive.api.entity.media.Event;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class EventFactory {
  public Event dtoToEntity(EventDTO dto) {
    Event event = new Event();
    event.setTitle(dto.getTitle());
    event.setDate(dto.getDate());
    event.setLocation(dto.getLocation());
    event.setDescription(dto.getDescription());
    return event;
  }
}
