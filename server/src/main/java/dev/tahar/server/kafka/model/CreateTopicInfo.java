package dev.tahar.server.kafka.model;

import lombok.NonNull;

/**
 * Information needed to create a new Kafka topic
 *
 * @param name              Name of the topic
 * @param partitionCount    Number of partitions to use
 * @param replicationFactor Replication factor for this topic
 */
public record CreateTopicInfo(@NonNull String name, int partitionCount, short replicationFactor) {
}
