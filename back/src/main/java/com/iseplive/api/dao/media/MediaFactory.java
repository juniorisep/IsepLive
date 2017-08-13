package com.iseplive.api.dao.media;

import com.iseplive.api.dto.VideoEmbedDTO;
import com.iseplive.api.entity.media.VideoEmbed;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class MediaFactory {
  public VideoEmbed dtoToVideoEmbedEntity(VideoEmbedDTO dto) {
    VideoEmbed videoEmbed = new VideoEmbed();
    videoEmbed.setType(dto.getType());
    videoEmbed.setUrl(dto.getUrl());
    return videoEmbed;
  }
}
