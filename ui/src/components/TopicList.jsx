import { useEffect, useState } from "react";

export const TopicList = ({ topics }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const disableCreateTopicButton = () => {
        return !topics || topics.length === 0 || applyTopicFilter().length > 0;
    };

    const applyTopicFilter = () => {
        if (!topics || topics.length === 0) {
            return [];
        }

        return topics.filter(topic => topic.includes(searchQuery));
    };

    return (
        <nav className="panel">
            <p className="panel-heading">
                Topics
            </p>

            <div className="panel-block">
                <p className="control has-icons-left">
                    <input className="input" type="text" placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value.toLowerCase().trim())} />
                    <span className="icon is-left">
                        <i className="fas fa-search"></i>
                    </span>
                </p>

                <div className="panel-block">
                    <button className={`button is-fullwidth ${disableCreateTopicButton() ? "" : "is-success is-outlined"}`} disabled={disableCreateTopicButton()}>
                        create new topic
                    </button>
                </div>
            </div>

            {applyTopicFilter().map((value, index) => (
                <a className="panel-block" key={index}>
                    <span className="panel-icon">
                        <i className="las la-envelope"></i>
                    </span>
                    {value}
                </a>
            ))}
        </nav>
    );
};
