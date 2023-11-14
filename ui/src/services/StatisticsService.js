/**
 * Fetches statistics about the event store collection
 * @param {callback} onSuccess Called upon success and contains the response data
 * @param {callback} onError Called if an error occurred - will contain the error object with more details about what went wrong
 * @param {callback} onFailure Called if the request succeeded, but returned a non-OK HTTP code - will contain the entire response object
 */
export const getEventStoreCollectionStatistics = (onSuccess, onError, onFailure) => {
    fetch("/api/v1/statistics/kafka/events")
        .then(response => {
            if (!response.ok && !!onFailure) {
                onFailure(response);
            }

            return response.json();
        })
        .then(json => (onSuccess && onSuccess(json)))
        .catch(error => (onError && onError(error)));
};