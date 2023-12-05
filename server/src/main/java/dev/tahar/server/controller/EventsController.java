package dev.tahar.server.controller;

import dev.tahar.server.service.ProduceEventService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.EventsApi;
import org.openapitools.model.EventStoreQueryResultV1;
import org.openapitools.model.ProduceStringEventV1;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EventsController implements EventsApi {

    private final ProduceEventService produceEventService;

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<Void> produceStringEventV1(ProduceStringEventV1 produceStringEventV1) {
        produceEventService.produceToTopic(produceStringEventV1.getData(), produceStringEventV1.getTopic());
        return ResponseEntity.ok().build();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<EventStoreQueryResultV1> queryEventStoreV1(String query) {
        return ResponseEntity.ok().build();
    }

}
