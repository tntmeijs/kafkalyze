package dev.tahar.server.mapping;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.KafkaClusterStatistics;

@Mapper(unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface StatisticsMapper {

    StatisticsMapper INSTANCE = Mappers.getMapper(StatisticsMapper.class);

    KafkaClusterStatistics toOpenApiClusterStatistics(dev.tahar.server.model.KafkaClusterStatistics kafkaClusterStatistics);

}
