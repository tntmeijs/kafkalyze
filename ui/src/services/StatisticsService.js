/**
 * Fetches statistics about the event store collection
 * @param {callback} onSuccess Called upon success and contains the response data
 * @param {callback} onError Called if an error occurred - will contain the error object with more details about what went wrong
 * @param {callback} onFailure Called if the request succeeded, but returned a non-OK HTTP code - will contain the entire response object
 */
export const getEventStoreCollectionStatistics = (onSuccess, onError, onFailure) => {
    fetch("/api/v1/statistics/kafka/events/storage")
        .then(response => {
            if (!response.ok && !!onFailure) {
                onFailure(response);
            }

            return response.json();
        })
        .then(json => (onSuccess && onSuccess(json)))
        .catch(error => (onError && onError(error)));
};

/**
 * Fetches statistics about the event distribution across topics within a given timeframe
 * @param {number} minTimestampMs Minimum timestamp in milliseconds to return in this query
 * @param {number} maxTimestampMs Maximum timestamp in milliseconds to return in this query
 * @param {callback} onSuccess Called upon success and contains the response data
 * @param {callback} onError Called if an error occurred - will contain the error object with more details about what went wrong
 * @param {callback} onFailure Called if the request succeeded, but returned a non-OK HTTP code - will contain the entire response object
 */
export const getEventDistributionStatistics = (minTimestampMs, maxTimestampMs, onSuccess, onError, onFailure) => {
    fetch(`/api/v1/statistics/kafka/events/distribution?minTimestampMs=${minTimestampMs}&maxTimestampMs=${maxTimestampMs}`)
        .then(response => {
            if (!response.ok && !!onFailure) {
                onFailure(response);
            }

            return response.json();
        })
        .then(json => (onSuccess && onSuccess(json)))
        .catch(error => (onError && onError(error)));
};

/**
 * Fetches statistics about the events consumed within a given timeframe
 * @param {number} minTimestampMs Minimum timestamp in milliseconds to return in this query
 * @param {number} maxTimestampMs Maximum timestamp in milliseconds to return in this query
 * @param {number} intervalMs Interval in milliseconds during which events are grouped and counted
 * @param {number} limit Maximum number of entries to return
 * @param {callback} onSuccess Called upon success and contains the response data
 * @param {callback} onError Called if an error occurred - will contain the error object with more details about what went wrong
 * @param {callback} onFailure Called if the request succeeded, but returned a non-OK HTTP code - will contain the entire response object
 */
export const getEventConsumptionStatistics = (minTimestampMs, maxTimestampMs, intervalMs, limit, onSuccess, onError, onFailure) => {
    fetch(`/api/v1/statistics/kafka/events/consumed?minTimestampMs=${minTimestampMs}&maxTimestampMs=${maxTimestampMs}&intervalMs=${intervalMs}&limit=${limit}`)
        .then(response => {
            if (!response.ok && !!onFailure) {
                onFailure(response);
            }

            return response.json();
        })
        .then(json => (onSuccess && onSuccess(json)))
        .catch(error => (onError && onError(error)));
};

/**
 * Fetches statistics about the Kafka cluster
 * @param {callback} onSuccess Called upon success and contains the response data
 * @param {callback} onError Called if an error occurred - will contain the error object with more details about what went wrong
 * @param {callback} onFailure Called if the request succeeded, but returned a non-OK HTTP code - will contain the entire response object
 */
export const getKafkaClusterStatistics = (onSuccess, onError, onFailure) => {
    fetch("/api/v1/statistics/kafka/cluster")
        .then(response => {
            if (!response.ok && !!onFailure) {
                onFailure(response);
            }

            return response.json();
        })
        .then(json => (onSuccess && onSuccess(json)))
        .catch(error => (onError && onError(error)));
};
