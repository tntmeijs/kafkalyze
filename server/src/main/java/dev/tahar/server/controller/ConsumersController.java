package dev.tahar.server.controller;

import dev.tahar.server.mapping.ConsumersMapper;
import dev.tahar.server.service.KafkaAdminService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.ConsumersApi;
import org.openapitools.model.KafkaConsumerGroups;
import org.openapitools.model.KafkaConsumerGroupsV1;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ConsumersController implements ConsumersApi {

    private final KafkaAdminService kafkaAdminService;

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<KafkaConsumerGroupsV1> fetchConsumerGroups(Optional<List<String>> status) {
        final var body = new KafkaConsumerGroupsV1();
        kafkaAdminService
                .listConsumerGroups()
                .stream()
                .filter(kafkaConsumerGroupInfo -> status
                        .map(statusStrings -> statusStrings
                                .stream()
                                .anyMatch(str -> str.equalsIgnoreCase(kafkaConsumerGroupInfo.consumerGroupState().toString())))
                        .orElse(true))
                .forEach(kafkaConsumerGroupInfo -> body.addConsumerGroupsItem(ConsumersMapper.INSTANCE.toApiModel(kafkaConsumerGroupInfo)));

        return ResponseEntity.ok(body);
    }

}
