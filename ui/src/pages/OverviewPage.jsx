import { useEffect, useState } from "react";
import { AreaChart } from "../components/visualisation/AreaChart";
import { DoughnutChart } from "../components/visualisation/DoughnutChart";
import { SingleValueStatisticCard } from "../components/visualisation/SingleValueStatisticCard";

export const OverviewPage = () => {
    const [statistics, setStatistics] = useState({
        eventsPerHourCount: null,
        totalEventCount: null,
        databaseSize: null,
        topicCount: null
    });

    useEffect(() => {
        // TODO: fetch statistics from backend
    }, []);

    return (
        <div className="box">
            <div className="columns">
                <div className="column is-flex is-flex-direction-column">
                    <SingleValueStatisticCard title="events per hour" value={statistics.eventsPerHourCount} loading={!statistics.eventsPerHourCount} colour="is-info" wrapperClassName="is-flex-grow-1" />
                </div>
                <div className="column is-flex is-flex-direction-column">
                    <SingleValueStatisticCard title="total events stored" value={statistics.totalEventCount} loading={!statistics.totalEventCount} colour="is-danger" wrapperClassName="is-flex-grow-1" />
                </div>
                <div className="column is-flex is-flex-direction-column">
                    <SingleValueStatisticCard title="database size" value={statistics.databaseSize} loading={!statistics.databaseSize} unit="GB" colour="is-warning" wrapperClassName="is-flex-grow-1" />
                </div>
                <div className="column is-flex is-flex-direction-column">
                    <SingleValueStatisticCard title="number of topics" value={statistics.topicCount} loading={!statistics.topicCount} colour="is-success" wrapperClassName="is-flex-grow-1" />
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
        </div>
    );
};
