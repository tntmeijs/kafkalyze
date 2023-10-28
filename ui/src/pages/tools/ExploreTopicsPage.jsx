import { useState } from "react";
import { TopicList } from "../../components/tools/topics/explorer/TopicList";
import { useInterval } from "../../hooks/useInterval";
import { getAllTopics } from "../../services/TopicsService";

export const ExploreTopicsPage = () => {
    const [topics, setTopics] = useState(null);
    useInterval(() => pollTopics(), 5_000);

    const pollTopics = () => {
        getAllTopics(
            setTopics,
            error => console.error(`Failed to fetch topics from server: ${error}`),
            response => console.error(`Fetched topics from server, but response was unsuccessful: HTTP ${response.status}: ${response.statusText}`))
    };

    return (
        <TopicList
            topics={topics}
            onNewTopicAdded={() => pollTopics()}
            onTopicDeleted={() => pollTopics()} />
    );
};
