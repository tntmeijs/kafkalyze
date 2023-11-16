import { useState } from "react";
import { AreaChart } from "../components/visualisation/AreaChart";
import { DoughnutChart } from "../components/visualisation/DoughnutChart";
import { SingleValueStatisticCard } from "../components/visualisation/SingleValueStatisticCard";
import { getAllTopics } from "../services/TopicsService";
import { getEventStoreCollectionStatistics, getKafkaClusterStatistics } from "../services/StatisticsService";
import { useInterval } from "../hooks/useInterval";

const KILOBYTE = 2 ** 10;
const MEGABYTE = 2 ** 20;
const GIGABYTE = 2 ** 30;

export const OverviewPage = () => {
    const [eventsPerHourCount, setEventsPerHourCount] = useState(null);
    const [totalEventCount, setTotalEventCount] = useState(null);
    const [databaseSize, setDatabaseSize] = useState({ value: null, unit: null });
    const [topics, setTopics] = useState(null);
    const [clusterStatistics, setClusterStatistics] = useState(null);

    useInterval(() => fetchStatistics(), 10_000);

    const fetchStatistics = () => {
        getAllTopics(
            topics => setTopics(topics),
            () => setTopics(undefined),
            () => setTopics(undefined));

        getEventStoreCollectionStatistics(
            statistics => setDatabaseSize(convertSize(statistics.databaseSizeInBytes)),
            () => setDatabaseSize({ value: undefined, unit: undefined }),
            () => setDatabaseSize({ value: undefined, unit: undefined }));

        getKafkaClusterStatistics(
            statistics => setClusterStatistics(statistics),
            () => setClusterStatistics(undefined),
            () => setClusterStatistics(undefined));
    };

    const convertSize = sizeInBytes => {
        let result = {};

        if (sizeInBytes >= KILOBYTE) {
            result.value = sizeInBytes / KILOBYTE;
            result.unit = "KB";
        } else if (sizeInBytes >= MEGABYTE) {
            result.value = sizeInBytes / MEGABYTE;
            result.unit = "MB";
        } else if (sizeInBytes > GIGABYTE) {
            result.value = sizeInBytes / GIGABYTE;
            result.unit = "GB";
        } else {
            result.value = sizeInBytes;
            result.unit = "B";
        }

        return result;
    };

    return (
        <div className="box">
            <div className="columns">
                <div className="column is-flex is-flex-direction-column">
                    <SingleValueStatisticCard
                        title="events per hour"
                        value={eventsPerHourCount}
                        loading={eventsPerHourCount === null}
                        failure={eventsPerHourCount === undefined}
                        colour="is-info"
                        wrapperClassName="is-flex-grow-1" />
                </div>
                <div className="column is-flex is-flex-direction-column">
                    <SingleValueStatisticCard
                        title="total events stored"
                        value={totalEventCount}
                        loading={totalEventCount === null}
                        failure={totalEventCount === undefined}
                        colour="is-danger"
                        wrapperClassName="is-flex-grow-1" />
                </div>
                <div className="column is-flex is-flex-direction-column">
                    <SingleValueStatisticCard
                        title="database size"
                        value={databaseSize.value}
                        loading={databaseSize.value === null}
                        failure={databaseSize.value === undefined}
                        unit={databaseSize.unit}
                        colour="is-warning"
                        wrapperClassName="is-flex-grow-1" />
                </div>
                <div className="column is-flex is-flex-direction-column">
                    <SingleValueStatisticCard
                        title="number of topics"
                        value={topics?.length}
                        loading={topics === null}
                        failure={topics === undefined}
                        colour="is-success"
                        wrapperClassName="is-flex-grow-1" />
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <AreaChart />
                </div>
                <div className="column is-one-third">
                    <DoughnutChart />
                </div>
            </div>

            <div className="box">
                <h2 className="subtitle">Nodes connected to the Kafka cluster</h2>

                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Node id</th>
                            <th>Hostname</th>
                            <th>Port</th>
                            <th>Rack id</th>
                            <th>Is cluster controller?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clusterStatistics?.nodes.map((node, index) => (
                            <tr>
                                <td>{node.id}</td>
                                <td>{node.hostname}</td>
                                <td>{node.port}</td>
                                <td>{node.rack ?? "unknown"}</td>
                                <td>{node.isClusterController ? "yes" : "no"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
