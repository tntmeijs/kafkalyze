package dev.tahar.server.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.tahar.server.database.EventDocument;
import dev.tahar.server.database.EventStoreRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
@KafkaListener(topicPattern = ".*", groupId = "${spring.application.name}")
public class Consumer {

    private final ObjectMapper objectMapper;
    private final EventStoreRepository eventStoreRepository;

    @KafkaHandler
    public void anyMessage(final Object rawData) {
        if (rawData instanceof ConsumerRecord<?, ?> consumerRecord) {
            log.debug("Consumed event: {}", consumerRecord.value());

            Object value = consumerRecord.value();

            if (value instanceof String string) {
                // String might be JSON-like
                final var optionalMap = tryStringToMap(string);

                if (optionalMap.isPresent()) {
                    value = optionalMap.get();
                }
            }

            final var eventDocument = new EventDocument(
                    consumerRecord.topic(),
                    value,
                    consumerRecord.partition(),
                    consumerRecord.offset(),
                    consumerRecord.timestamp());

            eventStoreRepository.insert(eventDocument);
        } else {
            log.error("Unable to handle consumed message: {}", rawData);
        }
    }

    private Optional<Map<String, Object>> tryStringToMap(@NonNull final String string) {
        try {
            return Optional.of(objectMapper.readValue(string, new TypeReference<>() {
            }));
        } catch (JsonProcessingException e) {
            log.debug("Unable to convert string into a map: {}", e.getMessage());
        }

        return Optional.empty();
    }

}
