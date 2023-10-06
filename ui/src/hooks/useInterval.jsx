import { useEffect } from "react";

/**
 * Calls a function every N milliseconds
 * @param {() => void} callback Method to call every N milliseconds
 * @param {Number} intervalMs Interval between invocations in milliseconds
 */
export const useInterval = (callback, intervalMs) => {
    useEffect(() => {
        callback();
        const handle = window.setInterval(callback, intervalMs);
        return () => window.clearInterval(handle);
    }, []);
};
