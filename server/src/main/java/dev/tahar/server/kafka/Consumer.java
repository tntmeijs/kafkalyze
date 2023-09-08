package dev.tahar.server.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaHandler;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@KafkaListener(topicPattern = ".*", groupId = "${spring.application.name}")
public class Consumer {

    @KafkaHandler
    public void anyMessage(String data) {
        log.warn("Received Kafka event: {}", data);
    }

}
