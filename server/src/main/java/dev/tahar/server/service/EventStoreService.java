package dev.tahar.server.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.tahar.server.database.EventDocument;
import dev.tahar.server.database.EventStoreRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventStoreService {

    private final ObjectMapper objectMapper;
    private final EventStoreRepository eventStoreRepository;

    /**
     * Attempt to store a given event as a JSON event
     *
     * @param topic     Topic the event was produced to
     * @param partition Partition within the topic the event was assigned to
     * @param offset    Message offset within the partition
     * @param timestamp Timestamp at which the message was consumed
     * @param data      String data to store as JSON data
     * @return True on success, false on failure
     */
    public boolean tryStoreJsonEvent(@NonNull final String topic,
                                     final int partition,
                                     final long offset,
                                     final long timestamp,
                                     final String data) {
        if (data == null) {
            return false;
        }

        final var map = tryStringToMap(data);

        if (map.isEmpty()) {
            return false;
        }

        final var document = new EventDocument(topic, data, partition, offset, timestamp);
        eventStoreRepository.save(document);
        return true;
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
