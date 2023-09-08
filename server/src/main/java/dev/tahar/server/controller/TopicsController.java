package dev.tahar.server.controller;

import org.openapitools.api.TopicsApi;
import org.openapitools.model.TopicInformationV1;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class TopicsController implements TopicsApi {

    @Override
    public ResponseEntity<TopicInformationV1> getAllTopics() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

}
