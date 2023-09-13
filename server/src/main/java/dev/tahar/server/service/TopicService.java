package dev.tahar.server.service;

import dev.tahar.server.kafka.model.CreateTopicInfo;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.Admin;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.admin.TopicListing;
import org.apache.kafka.common.Uuid;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TopicService {

    private final Admin admin;

    /**
     * Fetch all topics along with their ids from the Kafka broker
     *
     * @return Kafka topic names mapped to their ids
     */
    public Map<String, Uuid> getAllTopics() {
        try {
            return admin
                    .listTopics()
                    .listings()
                    .get()
                    .stream()
                    .filter(topicListing -> !topicListing.isInternal())
                    .collect(Collectors.toMap(TopicListing::name, TopicListing::topicId));
        } catch (ExecutionException e) {
            log.error("Execution exception occurred while listing topics:", e);
        } catch (InterruptedException e) {
            log.error("Interrupted exception occurred while listing topics");
            Thread.currentThread().interrupt();
        }

        return Collections.emptyMap();
    }

    /**
     * Create a new topic
     *
     * @param topic Topic to create
     * @return True if the topic was created successfully, false if the topic could not be created
     */
    public boolean createNewTopic(@NonNull final CreateTopicInfo topic) {
        return createNewTopics(Set.of(topic)).get(topic.name());
    }

    /**
     * Create multiple topics
     *
     * @param topics Topics to create
     * @return Map that contains the topic's name and whether it was created successfully
     */
    public Map<String, Boolean> createNewTopics(@NonNull final Set<CreateTopicInfo> topics) {
        final var newTopics = topics
                .stream()
                .map(topic -> new NewTopic(topic.name(), topic.partitionCount(), topic.replicationFactor()))
                .collect(Collectors.toSet());

        final var results = new HashMap<String, Boolean>(topics.size());
        for (final var entry : admin.createTopics(newTopics).values().entrySet()) {
            // If the future succeeds, then the topic must have been created successfully
            try {
                entry.getValue().whenComplete((none, throwable) -> results.put(entry.getKey(), throwable == null)).get();
            } catch (InterruptedException e) {
                log.error("Interrupted exception occurred while creating topic {}:", entry.getKey(), e);
                Thread.currentThread().interrupt();
            } catch (ExecutionException e) {
                log.error("Execution exception occurred while listing topics:", e);
            }
        }

        return results;
    }

    /**
     * Delete an existing topic
     *
     * @param topic Topic to delete
     * @return True if the topic was deleted successfully, false if the topic could not be deleted
     */
    public boolean deleteTopic(@NonNull final String topic) {
        return deleteTopics(Set.of(topic)).get(topic);
    }

    /**
     * Delete multiple topics
     *
     * @param topics Topics to delete
     * @return Map that contains the topic's name and whether it was deleted successfully
     */
    public Map<String, Boolean> deleteTopics(@NonNull final Set<String> topics) {
        final var results = new HashMap<String, Boolean>(topics.size());

        for (final var entry : admin.deleteTopics(topics).topicNameValues().entrySet()) {
            // If the future succeeds, then the topic must have been deleted successfully
            try {
                entry.getValue().whenComplete((none, throwable) -> results.put(entry.getKey(), throwable == null)).get();
            } catch (InterruptedException e) {
                log.error("Interrupted exception occurred while deleting topic(s):", e);
                Thread.currentThread().interrupt();
            } catch (ExecutionException e) {
                log.error("Execution exception occurred while deleting topics:", e);
            }
        }

        return results;
    }

}
