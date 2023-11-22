package dev.tahar.server.controller;

import dev.tahar.server.mapping.StatisticsMapper;
import dev.tahar.server.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.StatisticsApi;
import org.openapitools.model.EventConsumptionStatisticsV1;
import org.openapitools.model.EventDistributionStatisticsV1;
import org.openapitools.model.EventStorageStatisticsV1;
import org.openapitools.model.KafkaClusterStatistics;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StatisticsController implements StatisticsApi {

    private final StatisticsService statisticsService;

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<KafkaClusterStatistics> fetchClusterStatistics() {
        return ResponseEntity.ok(StatisticsMapper.INSTANCE.toOpenApiClusterStatistics(statisticsService.getForKafkaCluster()));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<EventConsumptionStatisticsV1> fetchEventConsumptionStatistics() {
        final var eventConsumptionPerTimeframe = statisticsService.getEventConsumptionPerTimeframe();

        final var body = new EventConsumptionStatisticsV1();
        body.setEventConsumedAtTimeframe(eventConsumptionPerTimeframe);

        return ResponseEntity.ok(body);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<EventDistributionStatisticsV1> fetchEventDistributionStatistics() {
        final var eventDistributionPerTopic = statisticsService.getEventDistributionPerTopic();

        final var body = new EventDistributionStatisticsV1();
        body.setEventDistributionPerTopic(eventDistributionPerTopic);

        return ResponseEntity.ok(body);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<EventStorageStatisticsV1> fetchEventStorageStatistics() {
        final var eventStoreCollectionStatistics = statisticsService.getForCollection("event-store");

        final var body = new EventStorageStatisticsV1();
        body.setDatabaseSizeInBytes(eventStoreCollectionStatistics.uncompressedStorageSize());
        body.setEventCount(eventStoreCollectionStatistics.documentCount());

        return ResponseEntity.ok(body);
    }

}
