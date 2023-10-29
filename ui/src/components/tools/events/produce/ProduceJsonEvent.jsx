import { useEffect, useState } from "react";
import { getAllTopics } from "../../../../services/TopicsService";
import { useInterval } from "../../../../hooks/useInterval";
import { useFormInput } from "../../../../hooks/useFormInput";

export const ProduceJsonEvent = () => {
    const [topics, setTopics] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [formInput, onFormInput, removeFormInputWithNames] = useFormInput();

    useInterval(() => getAllTopics(setTopics), 5_000);

    const onAddNewHeader = () => {
        setHeaders([...headers, { key: formInput.headerKey, value: formInput.headerValue }]);
        removeFormInputWithNames("headerKey", "headerValue");
    };

    const onDeleteHeader = indexToDelete => {
        setHeaders(previous => {
            // Avoids a direct state mutation: https://stackoverflow.com/a/65517477/11220609
            const left = previous.slice(0, indexToDelete);
            const right = previous.slice(indexToDelete + 1);
            return [...left, ...right];
        });
    };

    const disableAddHeaderButton = !formInput.headerKey || !formInput.headerValue || formInput.headerKey.length === 0 || formInput.headerValue.length === 0;

    return (
        <>
            <fieldset disabled={!topics}>
                <div className="field">
                    <label className="label">Topic</label>
                    <div className="control has-icons-left">
                        <div className={`select is-fullwidth ${!topics ? "is-loading" : ""}`}>
                            <select defaultValue="">
                                <option disabled={true} value="">{!topics ? "loading topics..." : "select a topic..."}</option>
                                {topics && topics.map((topic, index) => (
                                    <option key={index} value={topic}>{topic}</option>
                                ))}
                            </select>
                        </div>

                        <span className="icon is-medium is-left">
                            <i className="las la-envelope"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Headers</label>
                    <div className="field is-grouped">
                        <div className="control">
                            <input className="input" type="text" name="headerKey" value={formInput.headerKey ?? ""} placeholder="key" onChange={onFormInput} />
                        </div>
                        <div className="control">
                            <input className="input" type="text" name="headerValue" value={formInput.headerValue ?? ""} placeholder="value" onChange={onFormInput} />
                        </div>
                        <div className="control">
                            <button className={`button is-info ${disableAddHeaderButton ? "is-outlined" : ""}`} onClick={() => onAddNewHeader()} disabled={disableAddHeaderButton}>
                                <span className="icon is-medium">
                                    <i className="las la-plus"></i>
                                </span>
                                <span>add header</span>
                            </button>
                        </div>
                    </div>
                </div>

                {headers.map((header, index) => (
                    <div key={index} className="field is-grouped">
                        <div className="control">
                            <input className="input" type="text" value={header.key} readOnly={true} />
                        </div>
                        <div className="control">
                            <input className="input" type="text" value={header.value} readOnly={true} />
                        </div>
                        <div className="control">
                            <button className="button is-danger is-inverted" onClick={() => onDeleteHeader(index)}>
                                <span className="icon is-medium">
                                    <i className="las la-minus"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                ))}

                <div className="field">
                    <label className="label">Event data</label>
                    <div className="control">
                        <textarea
                            className="textarea has-fixed-size"
                            name="eventData"
                            placeholder="{ }"
                            value={formInput.eventData}
                            onChange={onFormInput}>
                        </textarea>
                    </div>
                </div>

                <div className="field">
                    <p className="control">
                        <button className="button is-success">Produce event</button>
                    </p>
                </div>
            </fieldset>
        </>
    );
};
