package dev.tahar.server.kafka;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@KafkaListener(topicPattern = ".*", groupId = "${spring.application.name}")
public class Consumer {

    @KafkaHandler
    public void anyMessage(final Object rawData) {
        if (rawData instanceof ConsumerRecord<?, ?> consumerRecord) {
            log.info("Consumed: {}", consumerRecord.value());
        } else {
            log.error("Unable to handle consumed message: {}", rawData);
        }
    }

}
