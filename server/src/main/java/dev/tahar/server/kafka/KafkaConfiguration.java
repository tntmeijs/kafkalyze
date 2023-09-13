package dev.tahar.server.kafka;

import jakarta.validation.constraints.NotNull;
import org.apache.kafka.clients.admin.Admin;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.ProducerFactory;

import java.util.HashMap;

@Configuration
public class KafkaConfiguration {

    @Bean
    @NotNull Admin kafkaAdminClient(@NotNull final ProducerFactory<String, String> producerFactory) {
        final var properties = new HashMap<>(producerFactory.getConfigurationProperties());

        // Not all properties are relevant for the Kafka admin client and are removed to ensure no warnings show up
        properties.remove("value.serializer");
        properties.remove("key.serializer");

        return Admin.create(properties);
    }

}
