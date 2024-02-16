package dev.tahar.server.kafka;

import dev.tahar.server.service.EventStoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
@KafkaListener(topicPattern = ".*", groupId = "${spring.application.name}_consume_any_event")
public class Consumer {

    private final EventStoreService eventStoreService;

    @KafkaHandler
    public void anyMessage(final Object rawData) {
        if (rawData instanceof ConsumerRecord<?, ?> consumerRecord) {
            log.debug("Consumed event: {}", consumerRecord.value());

            Object value = consumerRecord.value();

            if (value instanceof String string) {
                // String might be JSON-like
                if (!eventStoreService.tryStoreJsonEvent(consumerRecord.topic(),
                        consumerRecord.partition(),
                        consumerRecord.offset(),
                        consumerRecord.timestamp(),
                        string)) {
                    log.error("Failed to save event as a JSON event");
                }
            } else {
                log.error("Unable to handle consumer record value");
            }
        } else {
            log.error("Unable to handle consumed message: {}", rawData);
        }
    }

}
