package dev.tahar.server.kafka.model;

import lombok.NonNull;

import java.util.Set;

public record KafkaBrokerStatistics(@NonNull Set<String> topics) {
}
