package dev.tahar.server.model;

import lombok.NonNull;

/**
 * Contains information about a node in a Kafka cluster
 *
 * @param id                  Node's identifier
 * @param hostname            Hostname of the node
 * @param port                Port the node is listening on
 * @param rack                Rack the node belongs to
 * @param isClusterController Indicates whether this node is the cluster controller
 */
public record ClusterNodeInformation(
        int id,
        @NonNull String hostname,
        int port,
        String rack,
        boolean isClusterController
) {
}
