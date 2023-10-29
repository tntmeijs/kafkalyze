import { useState } from "react";

/**
 * Custom hook to help implement toggle behaviour for modals and the like
 * @returns State boolean and a method to toggle the state
 */
export const useToggle = () => {
    const [state, setState] = useState(false);
    return [state, () => setState(!state)];
};
