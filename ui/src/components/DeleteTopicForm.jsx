import { useState } from "react";

export const DeleteTopicForm = ({ topicName, onCancel, onFailure, onSuccess }) => {
    const [confirmation, setConfirmation] = useState("");
    const [awaitResponse, setAwaitResponse] = useState(false);

    const deleteTopic = () => {
        setAwaitResponse(true);
        fetch(`/api/v1/topics/${topicName}`, { method: "DELETE" })
            .then(response => {
                if (response.ok) {
                    !!onSuccess && onSuccess(topicName);
                } else {
                    !!onFailure && onFailure(`request failed with status code HTTP ${response.status} (${response.statusText})`);
                }
            })
            .catch(error => { !!onFailure && onFailure(error) })
            .finally(() => setAwaitResponse(false));
    };

    return (
        <article className="message is-danger">
            <div className="message-header">
                <p>Delete a topic</p>
            </div>

            <div className="message-body">
                <div className="block">
                    <p>You are about to perform a destructive action which cannot be reversed. All data stored on "{topicName}" will be lost!</p>
                </div>
                <div className="block">
                    <p>To confirm the deletion of this topic, please enter <code>{topicName}</code>below:</p>
                </div>


                <div className="block">
                    <div className="field">
                        <p className="control">
                            <input className="input" type="text" value={confirmation} placeholder={topicName} onChange={e => setConfirmation(e.target.value)} disabled={awaitResponse} />
                        </p>
                    </div>
                </div>

                <div className="field is-grouped">
                    <p className="control">
                        <button className="button is-info" onClick={() => { onCancel && onCancel() }} disabled={awaitResponse}>cancel</button>
                    </p>

                    <p className="control">
                        <button className={`button is-danger ${awaitResponse || confirmation !== topicName ? "is-outlined" : ""} ${awaitResponse ? "is-loading" : ""}`} onClick={() => deleteTopic()} disabled={awaitResponse || confirmation !== topicName}>delete</button>
                    </p>
                </div>
            </div>
        </article>
    );
};
