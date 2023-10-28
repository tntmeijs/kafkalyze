import { useEffect, useState } from "react";
import { useFormInput } from "../../../../hooks/useFormInput";

const FORM_FIELD_TO_VALIDATION_METHOD = {
    "topicName": topicName => topicName.length > 0 && topicName.length <= 249 && topicName.match("[a-zA-Z0-9\\._\\-]"),
    "partitionCount": partitionCount => partitionCount > 0,
    "replicationFactor": replicationFactor => replicationFactor > 0,
    "acknowledgement": acknowledgement => acknowledgement
};

export const CreateTopicForm = ({ defaultTopicName, onCancel, onSuccess, onFailure }) => {
    const [awaitResponse, setAwaitResponse] = useState(false);
    const [allowNewTopicSubmit, setAllowNewTopicSubmit] = useState(false);
    const [formInput, onFormInput] = useFormInput({ topicName: defaultTopicName });

    // Run form validation after every single input
    useEffect(() => validateInput(), []);
    useEffect(() => {
        console.log(formInput);
        console.log(Object.keys(formInput).filter(key => FORM_FIELD_TO_VALIDATION_METHOD[key](formInput[key])).length, "===", Object.keys(FORM_FIELD_TO_VALIDATION_METHOD).length);
        validateInput();
    }, [formInput]);

    const validateInput = () => setAllowNewTopicSubmit(Object.keys(formInput).length > 0 && Object.keys(formInput).filter(key => FORM_FIELD_TO_VALIDATION_METHOD[key](formInput[key])).length === Object.keys(FORM_FIELD_TO_VALIDATION_METHOD).length);

    const createTopic = () => {
        const body = ({
            name: formInput.topicName,
            partitionCount: formInput.partitionCount,
            replicationFactor: formInput.replicationFactor
        });

        setAwaitResponse(true);
        fetch("/api/v1/topics", { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (response.ok) {
                    !!onSuccess && onSuccess(body);
                } else {
                    !!onFailure && onFailure(`request failed with status code HTTP ${response.status} (${response.statusText})`);
                }
            })
            .catch(error => { !!onFailure && onFailure(error) })
            .finally(() => setAwaitResponse(false));
    };

    return (
        <article className="message is-info">
            <div className="message-header">
                <p>Create a new topic</p>
            </div>

            <div className="message-body">
                <div className="field">
                    <label className="label">Topic name</label>
                    <p className="control has-icons-left">
                        <input className="input" name="topicName" type="text" placeholder="name" defaultValue={defaultTopicName} onChange={onFormInput} disabled={awaitResponse} />
                        <span className="icon is-small is-left">
                            <i className="las la-signature"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <label className="label">Partition count</label>
                    <p className="control has-icons-left">
                        <input className="input" name="partitionCount" min={1} type="number" placeholder="partition count" onChange={onFormInput} disabled={awaitResponse} />
                        <span className="icon is-small is-left">
                            <i className="las la-copy"></i>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <label className="label">Replication factor</label>
                    <p className="control has-icons-left">
                        <input className="input" name="replicationFactor" min={1} type="number" placeholder="replication factor" onChange={onFormInput} disabled={awaitResponse} />
                        <span className="icon is-small is-left">
                            <i className="las la-clone"></i>
                        </span>
                    </p>
                </div>

                <label className="checkbox ml-1">
                    <input type="checkbox" name="acknowledgement" onChange={onFormInput} disabled={awaitResponse} />
                    <span className="ml-2">I acknowledge that I understand the consequences of creating a new topic</span>
                </label>

                <div className="field is-grouped mt-3">
                    <p className="control">
                        <button className="button is-info" onClick={() => { onCancel && onCancel() }} disabled={awaitResponse}>cancel</button>
                    </p>
                    <p className="control">
                        <button className={`button is-success ${awaitResponse || !allowNewTopicSubmit ? "is-outlined" : ""} ${awaitResponse ? "is-loading" : ""}`} onClick={() => createTopic()} disabled={awaitResponse || !allowNewTopicSubmit}>create</button>
                    </p>
                </div>
            </div>
        </article>
    );
};
