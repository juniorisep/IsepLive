package com.iseplive.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
public class IsepliveApplication {
  public static void main(String[] args) {
    ConfigurableApplicationContext ac = SpringApplication.run(IsepliveApplication.class, args);
    DatabaseSeeder tdbs = ac.getBeanFactory().createBean(DatabaseSeeder.class);
    tdbs.seedDatabase();
  }
}
