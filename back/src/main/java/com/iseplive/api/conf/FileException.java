package com.iseplive.api.conf;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Guillaume on 17/08/2017.
 * back
 */
@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class FileException extends RuntimeException {
  public FileException(String message) {
    super(message);
  }
}
