package dev.tahar.server.controller;

import dev.tahar.server.mapping.StatisticsMapper;
import dev.tahar.server.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.StatisticsApi;
import org.openapitools.model.EventConsumptionStatisticsV1;
import org.openapitools.model.EventDistributionStatisticsV1;
import org.openapitools.model.EventStorageStatisticsV1;
import org.openapitools.model.KafkaClusterStatistics;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Objects;

@Slf4j
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
    public ResponseEntity<EventConsumptionStatisticsV1> fetchEventConsumptionStatistics(Long minTimestampMs, Long maxTimestampMs, Long intervalMs, Integer limit) {
        final var eventConsumptionPerTimeframe = statisticsService.getEventConsumptionWithInterval(minTimestampMs, maxTimestampMs, intervalMs, limit);

        // OpenAPI only allows Map<String, T>, which is why timestamps need to be of type String
        final var dataset = new LinkedHashMap<String, Long>();

        // Generate missing data-point for the requested intervals
        final var mostRecentTimestampRoundedDown = maxTimestampMs - (maxTimestampMs % intervalMs);
        for (int i = 0; i < limit; ++i) {
            final var timestampToInsert = mostRecentTimestampRoundedDown - (i * intervalMs);
            final var potentialDatapoint = eventConsumptionPerTimeframe.get(timestampToInsert);

            // If there is no data-point for the given timestamp, a default value of zero will be used instead
            dataset.put(String.valueOf(timestampToInsert), Objects.requireNonNullElse(potentialDatapoint, 0L));
        }

        final var body = new EventConsumptionStatisticsV1();
        body.setEventsConsumedAtTimeframe(dataset);
        return ResponseEntity.ok(body);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<EventDistributionStatisticsV1> fetchEventDistributionStatistics(Long minTimestampMs, Long maxTimestampMs) {
        final var eventDistributionPerTopic = statisticsService.getEventDistributionPerTopic(minTimestampMs, maxTimestampMs);

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
