package dev.tahar.server.service;

import dev.tahar.server.database.CollectionStatistics;
import dev.tahar.server.database.EventStoreRepository;
import dev.tahar.server.model.KafkaClusterStatistics;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final MongoTemplate mongoTemplate;
    private final KafkaAdminService kafkaAdminService;
    private final EventStoreRepository eventStoreRepository;

    @Value("${spring.data.mongodb.database}")
    private String databaseName;

    public CollectionStatistics getForCollection(@NonNull final String collectionName) {
        // TODO: upgrade to collStats aggregation because this command has been deprecated since MongoDB 6.2
        //       https://www.mongodb.com/docs/v7.0/reference/command/collStats/
        final var result = mongoTemplate.getDb().runCommand(new Document("collStats", collectionName));

        return new CollectionStatistics(
                Long.valueOf(result.getInteger("avgObjSize")),
                Long.valueOf(result.getInteger("count")),
                Long.valueOf(result.getInteger("nindexes")),
                Long.valueOf(result.getInteger("totalIndexSize")),
                Long.valueOf(result.getInteger("size")));
    }

    public KafkaClusterStatistics getForKafkaCluster() {
        // TODO: also fetch topic and partition-related statistics to provide more meaningful data
        return new KafkaClusterStatistics(kafkaAdminService.getNodesInCluster());
    }

    public Map<String, Long> getEventDistributionPerTopic() {
        return eventStoreRepository
                .aggregateEventsByTopic()
                .getMappedResults()
                .stream()
                .collect(Collectors.toMap(EventStoreRepository.EventsPerTopicCount::topic, EventStoreRepository.EventsPerTopicCount::count));
    }

    public Map<String, Long> getEventConsumptionPerTimeframe() {
        return eventStoreRepository
                .aggregateEventConsumedCountPerMinute()
                .getMappedResults()
                .stream()
                .collect(Collectors.toMap(EventStoreRepository.EventCountPerTimeUnit::date, EventStoreRepository.EventCountPerTimeUnit::count));
    }

}
