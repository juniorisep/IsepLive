package com.iseplive.api.conf;

import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;

/**
 * Created by Guillaume on 31/07/2017.
 * back
 */
@Configuration
@EnableSwagger2
@ComponentScan("com.iseplive.api")
public class SwaggerConfiguration {

  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
      .select()
      .apis(RequestHandlerSelectors.any())
      .paths(PathSelectors.any())
      .build()
      .select()
      .apis(Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot")))
      .build()
      .globalOperationParameters(
        Arrays.asList(new ParameterBuilder()
          .name("Authorization")
          .description("Auth header")
          .modelRef(new ModelRef("string"))
          .parameterType("header")
          .defaultValue("Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sImlzcyI6IklzZXBMaXZlIiwiaWQiOjEsImV4cCI6MTUwMjgzNTg2NiwiaWF0IjoxNTAyMjMxMDY2fQ.Ct4uVc6a8a6_ECdR3yZ4JPAGFqFMZvWU1bRMGKxArLQ")
          .required(true)
          .build()));
  }

}
