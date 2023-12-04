package dev.tahar.server.controller;

import lombok.RequiredArgsConstructor;
import org.openapitools.api.SystemApi;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SystemController implements SystemApi {

    /**
     * {@inheritDoc}
     */
    @Override
    public ResponseEntity<Void> livenessProbe() {
        // The fact that the user can receive this response already implies that the server has started successfully
        return ResponseEntity.ok().build();
    }

}
