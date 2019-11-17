FROM openjdk:8-jre-slim

WORKDIR /app
COPY target/iseplive-api-1.3.0.jar .
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/iseplive-api-1.3.0.jar"]