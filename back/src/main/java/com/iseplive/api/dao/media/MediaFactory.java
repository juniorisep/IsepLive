package com.iseplive.api.dao.media;

import com.iseplive.api.dto.GalleryDTO;
import com.iseplive.api.dto.VideoIntegrationDTO;
import com.iseplive.api.entity.media.Gallery;
import com.iseplive.api.entity.media.VideoIntegration;
import org.springframework.stereotype.Service;

/**
 * Created by Guillaume on 01/08/2017.
 * back
 */
@Service
public class MediaFactory {
    public VideoIntegration dtoToVideoIntegrationEntity(VideoIntegrationDTO dto) {
        VideoIntegration videoIntegration = new VideoIntegration();
        videoIntegration.setType(dto.getType());
        videoIntegration.setUrl(dto.getUrl());
        return videoIntegration;
    }
}
