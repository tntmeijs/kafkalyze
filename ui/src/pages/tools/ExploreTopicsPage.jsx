import { useEffect, useState } from "react";
import { TopicList } from "../../components/TopicList";
import { useInterval } from "../../hooks/useInterval";

export const ExploreTopicsPage = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => pollTopics(), []);
    // useInterval(() => pollTopics(), 5_000);

    const pollTopics = () => {
        fetch("/api/v1/topics")
            .then(response => response.json())
            .then(json => setTopics(json.topics))
            .catch(error => console.error(`Failed to fetch topics from server: ${error}`));
    };

    return (
        <TopicList topics={topics} />
    );
};
