/**
 * Checks if the server is online
 * @param {callback} onSuccess Called upon success
 * @param {callback} onError Called if an error occurred - will contain the error object with more details about what went wrong
 * @param {callback} onFailure Called if the request succeeded, but returned a non-OK HTTP code - will contain the entire response object
 */
export const checkServerLiveness = (onSuccess, onError, onFailure) => {
    fetch("/api/v1/system/liveness")
        .then(response => {
            if (!response.ok && !!onFailure) {
                onFailure(response);
            } else if (onSuccess) {
                onSuccess();
            }
        })
        .catch(error => (onError && onError(error)));
};
