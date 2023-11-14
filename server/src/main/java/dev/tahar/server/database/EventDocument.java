package dev.tahar.server.database;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("event-store")
public class EventDocument {

    private final String topic;
    private final Object data;

    private final int partition;

    private final long offset;
    private final long timestamp;

}
