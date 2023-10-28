/**
 * Fetches all available Kafka topics
 * @param {callback} onSuccess Called upon success and contains the response data
 * @param {callback} onError Called if an error occurred - will contain the error object with more details about what went wrong
 * @param {callback} onFailure Called if the request succeeded, but returned a non-OK HTTP code - will contain the entire response object
 */
export const getAllTopics = (onSuccess, onError, onFailure) => {
    fetch("/api/v1/topics")
        .then(response => {
            if (!response.ok && !!onFailure) {
                onFailure(response);
            }

            return response.json();
        })
        .then(json => (onSuccess && onSuccess(json.topics)))
        .catch(error => (onError && onError(error)));
};
