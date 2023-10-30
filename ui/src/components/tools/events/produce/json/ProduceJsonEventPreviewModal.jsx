import { useState } from "react";
import { useFormInput } from "../../../../../hooks/useFormInput";

export const ProduceJsonEventPreviewModal = ({ topic, eventData, onCancel, onSuccess, onFailure, headers = [] }) => {
    const [awaitResponse, setAwaitResponse] = useState(false);
    const [formInput, onFormInput] = useFormInput();

    const produceEvent = () => {
        const body = {
            topic: topic,
            data: eventData
        };

        setAwaitResponse(true);
        fetch("/api/v1/events", { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (response.ok) {
                    !!onSuccess && onSuccess(body);
                } else {
                    !!onFailure && onFailure(`Request failed with status code HTTP ${response.status} (${response.statusText})`);
                }
            })
            .catch(error => { !!onFailure && onFailure(error) })
            .finally(() => setAwaitResponse(false));
    };

    return (
        <article className="message is-info">
            <div className="message-header">
                <p>Produce a JSON event</p>
            </div>

            <div className="message-body">
                <div className="field">
                    <label className="label">Topic name</label>
                    <p className="control has-icons-left">
                        <input className="input" name="topicName" type="text" placeholder="name" value={topic} readOnly={true} />
                        <span className="icon is-small is-left">
                            <i className="las la-envelope"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <label className="label">Headers</label>
                    {headers.length > 0
                        ? (
                            headers.map((header, index) => (
                                <div key={index} className="field is-grouped">
                                    <div className="control">
                                        <input className="input" type="text" value={header.key} readOnly={true} />
                                    </div>
                                    <div className="control">
                                        <input className="input" type="text" value={header.value} readOnly={true} />
                                    </div>
                                </div>
                            ))
                        )
                        : (
                            <span>No headers</span>
                        )}
                </div>

                <div className="field">
                    <label className="label">Event data</label>
                    <pre>{eventData}</pre>
                </div>

                <fieldset disabled={awaitResponse}>
                    <label className="checkbox ml-1">
                        <input type="checkbox" name="acknowledgement" checked={!!formInput.acknowledgement} onChange={onFormInput} disabled={awaitResponse} />
                        <span className="ml-2">I acknowledge that I understand the consequences of producing this event</span>
                    </label>

                    <div className="field is-grouped mt-3">
                        <p className="control">
                            <button className="button is-info" onClick={() => { onCancel && onCancel() }}>cancel</button>
                        </p>
                        <p className="control">
                            <button className={`button is-success ${awaitResponse ? "is-outlined" : ""} ${awaitResponse ? "is-loading" : ""}`} onClick={() => produceEvent()} disabled={!formInput.acknowledgement}>produce</button>
                        </p>
                    </div>
                </fieldset>
            </div>
        </article>
    );
};
