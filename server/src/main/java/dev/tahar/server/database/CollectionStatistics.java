package dev.tahar.server.database;

// For a list of available fields, see: https://www.mongodb.com/docs/v7.0/reference/command/collStats/
public record CollectionStatistics(
        Integer averageDocumentSize,
        Integer documentCount,
        Integer indexCount,
        Integer allocatedStorageSize,
        Integer totalIndexSize,
        Integer uncompressedStorageSize
) {
}
