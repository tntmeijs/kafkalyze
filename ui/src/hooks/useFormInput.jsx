import { useState } from "react";

export const useFormInput = initialState => {
    const [formInput, setFormInput] = useState(initialState ?? {});

    const onFormInput = event => setFormInput({
        ...formInput,
        [event.target.name]: event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
    });

    return [formInput, onFormInput];
};
