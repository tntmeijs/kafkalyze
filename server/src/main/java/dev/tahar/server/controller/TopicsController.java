package dev.tahar.server.controller;

import dev.tahar.server.kafka.model.CreateTopicInfo;
import dev.tahar.server.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.TopicsApi;
import org.openapitools.model.CreateNewTopicV1;
import org.openapitools.model.DeleteTopicV1;
import org.openapitools.model.TopicInformationV1;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TopicsController implements TopicsApi {

    private final TopicService topicService;

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<Void> createNewTopic(CreateNewTopicV1 createNewTopicV1) {
        final var result = topicService.createNewTopic(new CreateTopicInfo(
                createNewTopicV1.getName(),
                createNewTopicV1.getPartitionCount(),
                createNewTopicV1.getReplicationFactor().shortValue()));

        return result
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<Void> deleteExistingTopic(DeleteTopicV1 deleteTopicV1) {
        final var result = topicService.deleteTopic(deleteTopicV1.getName());

        return result
                ? ResponseEntity.ok().build()
                : ResponseEntity.badRequest().build();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<TopicInformationV1> getAllTopics() {
        final var response = new TopicInformationV1();
        response.setTopics(topicService.getAllTopics().keySet().stream().sorted().toList());

        return ResponseEntity.ok(response);
    }

}
