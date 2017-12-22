package com.iseplive.api.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Guillaume on 18/08/2017.
 * back
 */
@Configuration
public class StorageConfig extends WebMvcConfigurerAdapter {

  @Value("${storage.url}")
  String base;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
      .addResourceHandler("/storage/**")
      .addResourceLocations("file:"+base + "/");
  }

}
