import { useState } from "react";

/**
 * Custom hook to help simplify storing form input in a nested object
 * @param {Object} initialState Initial input value, use this to provide a default state
 * @returns Array containing (in this order): current form input value, form input "onChange" handler, and a utility method to remove a specific input by name
 */
export const useFormInput = initialState => {
    const [formInput, setFormInput] = useState(initialState ?? {});

    /**
     * Method that should be connected to a form input's "onChange" callback
     * @param {Event} event Element emitted by a form input object
     */
    const onFormInput = event => setFormInput({
        ...formInput,
        [event.target.name]: event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
    });

    /**
     * Removes one or multiple names from the form input object, useful if an input should be cleared
     * @param  {...any} names Names of the inputs to remove
     */
    const removeFormInputWithNames = (...names) => {
        const updatedFormInput = formInput;
        names.forEach(name => delete updatedFormInput[name])
        setFormInput(updatedFormInput);
    };

    return [formInput, onFormInput, setFormInput, removeFormInputWithNames];
};
