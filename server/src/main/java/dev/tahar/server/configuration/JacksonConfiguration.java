package dev.tahar.server.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfiguration {

    @Bean
    ObjectMapper objectMapper() {
        return new ObjectMapper().configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

}
