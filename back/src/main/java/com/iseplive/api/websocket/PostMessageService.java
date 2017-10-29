package com.iseplive.api.websocket;

import com.iseplive.api.entity.Post;
import com.iseplive.api.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Guillaume on 29/10/2017.
 * back
 */
@Service
public class PostMessageService {

  private Map<Long, Set<WebSocketSession>> clients = new ConcurrentHashMap<>();

  @Autowired
  private JsonUtils jsonUtils;

  public void addClient(Long id, WebSocketSession session) {
    clients.computeIfAbsent(id, k -> ConcurrentHashMap.newKeySet());
    clients.get(id).add(session);
    System.out.println("id: "+ id +" add: " +clients);
  }

  public void removeSession(WebSocketSession session) {
    clients.forEach((id, sessions) -> {
      if (sessions.contains(session)) {
        clients.get(id).remove(session);
      }
    });
    System.out.println("remove: "+clients);
  }

  public void broadcastPost(Long senderId, Post p) {
    String message = jsonUtils.serialize(p);
    clients.forEach((id, sessions) -> {
      if (!id.equals(senderId)) {
        sessions.forEach(s -> {
          try {
            s.sendMessage(new TextMessage(message));
          } catch (IOException e) {
            e.printStackTrace();
          }
        });
      }
    });
  }
}
