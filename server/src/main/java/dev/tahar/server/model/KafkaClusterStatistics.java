package dev.tahar.server.model;

import lombok.NonNull;

import java.util.List;

public record KafkaClusterStatistics(@NonNull List<ClusterNodeInformation> nodes) {
}
