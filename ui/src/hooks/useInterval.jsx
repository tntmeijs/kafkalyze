import { useEffect, useRef } from "react";

/**
 * Calls a function every N milliseconds
 * @param {() => void} callback Method to call every N milliseconds
 * @param {Number} intervalMs Interval between invocations in milliseconds
 */
export const useInterval = (callback, intervalMs) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const intervalId = setInterval(() => savedCallback.current(), intervalMs);
        return () => clearInterval(intervalId);
    }, [intervalMs]);
};
