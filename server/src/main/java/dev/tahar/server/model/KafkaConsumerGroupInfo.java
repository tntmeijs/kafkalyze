package dev.tahar.server.model;

import lombok.NonNull;

/**
 * Holds information about a Kafka consumer group
 *
 * @param groupId Consumer group's identifier
 */
public record KafkaConsumerGroupInfo(@NonNull String groupId, @NonNull ConsumerGroupState consumerGroupState) {
}
