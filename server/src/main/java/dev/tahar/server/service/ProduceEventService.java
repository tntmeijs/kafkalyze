package dev.tahar.server.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProduceEventService {

    private final KafkaTemplate<String, String> stringKafkaTemplate;

    /**
     * Send a string to the specified Kafka topic
     *
     * @param event Event data as a string
     * @param topic Topic to produce the event to
     */
    public void produceToTopic(@NonNull final String event, @NonNull final String topic) {
        stringKafkaTemplate
                .send(topic, event)
                .whenComplete(((stringStringSendResult, throwable) -> {
                    if (throwable == null) {
                        log.debug("Successfully sent a message to Kafka");
                        return;
                    }

                    log.error("Failed to send a message to Kafka:", throwable);
                }));
    }

}
