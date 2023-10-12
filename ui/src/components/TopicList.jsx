import { useState } from "react";
import { Modal } from "./Modal";
import { CreateTopicForm } from "./CreateTopicForm";
import { DeleteTopicForm } from "./DeleteTopicForm";

export const TopicList = ({ topics, onNewTopicAdded, onTopicDeleted }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [topicSelectedForDeletion, setTopicSelectedForDeletion] = useState(null);
    const [displayCreateTopicPopup, setDisplayCreateTopicPopup] = useState(false);

    const disableCreateTopicButton = () => {
        return !topics || applyTopicFilter().length > 0;
    };

    const applyTopicFilter = () => {
        if (!topics || topics.length === 0) {
            return [];
        }

        return topics.filter(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    return (
        <nav className="panel">
            <p className="panel-heading">
                Topics
            </p>

            <div className="panel-block">
                <p className="control has-icons-left">
                    <input className="input" type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value.trim())} />
                    <span className="icon is-left">
                        <i className="las la-search"></i>
                    </span>
                </p>

                <div className="panel-block">
                    <button
                        className={`button is-fullwidth ${disableCreateTopicButton() ? "" : "is-success"}`}
                        disabled={disableCreateTopicButton()}
                        onClick={() => setDisplayCreateTopicPopup(true)}>
                        create new topic
                    </button>
                </div>
            </div>

            {applyTopicFilter().map((value, index) => (
                <a className="panel-block flex" key={index}>
                    <span className="panel-icon">
                        <i className="las la-envelope"></i>
                    </span>
                    <span className="is-flex-grow-1">{value}</span>
                    <button className="button" onClick={() => setTopicSelectedForDeletion(value)}>
                        <span className="icon is-small">
                            <i className="las la-trash"></i>
                        </span>
                    </button>
                </a>
            ))}

            {displayCreateTopicPopup && (
                <Modal>
                    <CreateTopicForm
                        defaultTopicName={searchQuery}
                        onCancel={() => setDisplayCreateTopicPopup(false)}
                        onSuccess={result => {
                            !!onNewTopicAdded && onNewTopicAdded(result);
                            setDisplayCreateTopicPopup(false);
                            setSearchQuery("");
                        }}
                        onFailure={error => console.error(`Failed to create topic: ${error}`)} />
                </Modal>
            )}

            {!!topicSelectedForDeletion && (
                <Modal>
                    <DeleteTopicForm
                        topicName={topicSelectedForDeletion}
                        onCancel={() => setTopicSelectedForDeletion(null)}
                        onSuccess={result => {
                            !!onTopicDeleted && onTopicDeleted(result);
                            setTopicSelectedForDeletion(null);
                            setSearchQuery("");
                        }}
                        onFailure={error => console.error(`Failed to delete topic: ${error}`)} />
                </Modal>
            )}
        </nav>
    );
};
