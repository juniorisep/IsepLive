package com.iseplive.api.dao.image;

import com.iseplive.api.entity.media.Image;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Repository
public interface ImageRepository extends CrudRepository<Image, Long> {
}
