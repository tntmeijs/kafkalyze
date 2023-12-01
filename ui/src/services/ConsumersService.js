/**
 * Fetches all available Kafka consumer groups
 * @param {string[]} status Optional filter to only display consumer groups with the given status
 * @param {callback} onSuccess Called upon success and contains the response data
 * @param {callback} onError Called if an error occurred - will contain the error object with more details about what went wrong
 * @param {callback} onFailure Called if the request succeeded, but returned a non-OK HTTP code - will contain the entire response object
 */
export const getAllConsumerGroups = (status, onSuccess, onError, onFailure) => {
    let url = "/api/v1/consumers";

    // Construct query parameter array manually
    if (status) {
        url += "?status="

        if (Array.isArray(status)) {
            for (let i = 0; i < status.length; ++i) {
                url += status[i];

                if (i < status.length - 1) {
                    url += '&';
                }
            }
        } else {
            url += status;
        }
    }

    console.log(url);

    fetch(url)
        .then(response => {
            if (!response.ok && !!onFailure) {
                onFailure(response);
            }

            return response.json();
        })
        .then(json => (onSuccess && onSuccess(json.consumerGroups)))
        .catch(error => (onError && onError(error)));
};
