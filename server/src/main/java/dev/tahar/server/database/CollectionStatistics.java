package dev.tahar.server.database;

public record CollectionStatistics(
        Long averageDocumentSize,
        Long documentCount,
        Long indexCount,
        Long totalIndexSize,
        Long uncompressedStorageSize
) {
}
