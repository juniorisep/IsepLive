FROM openjdk:8-jre-slim

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app
COPY target/iseplive-api-1.4.0.jar .
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/iseplive-api-1.4.0.jar"]