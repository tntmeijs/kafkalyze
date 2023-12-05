package dev.tahar.server.mapping;

import dev.tahar.server.model.ConsumerGroupState;
import dev.tahar.server.model.KafkaConsumerGroupInfo;
import lombok.NonNull;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.openapitools.model.KafkaConsumerGroupsV1ConsumerGroupsInner;

@Mapper
public interface ConsumersMapper {

    ConsumersMapper INSTANCE = Mappers.getMapper(ConsumersMapper.class);

    KafkaConsumerGroupsV1ConsumerGroupsInner toApiModel(@NonNull final KafkaConsumerGroupInfo kafkaConsumerGroupInfo);

    ConsumerGroupState map(@NonNull final org.apache.kafka.common.ConsumerGroupState consumerGroupState);

}
