package dev.tahar.server.controller;

import dev.tahar.server.mapping.StatisticsMapper;
import dev.tahar.server.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.StatisticsApi;
import org.openapitools.model.EventStatisticsV1;
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
    public ResponseEntity<EventStatisticsV1> fetchEventStatistics() {
        final var statistics = statisticsService.getForCollection("event-store");

        final var body = new EventStatisticsV1();
        body.setDatabaseSizeInBytes(statistics.uncompressedStorageSize());

        return ResponseEntity.ok(body);
    }

}
