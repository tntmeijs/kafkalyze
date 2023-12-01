import { useEffect, useState } from "react";
import { DoughnutChart } from "../../visualisation/DoughnutChart";
import { useInterval } from "../../../hooks/useInterval";
import { getEventDistributionStatistics } from "../../../services/StatisticsService";

const TIME_PERIODS = {
    "1 year": 365 * 24 * 60 * 60 * 1_000,
    "4 weeks": 4 * 7 * 24 * 60 * 60 * 1_000,
    "1 week": 7 * 24 * 60 * 60 * 1_000,
    "1 day": 24 * 60 * 60 * 1_000
};

export const EventDistributionChart = ({ wrapperClassName, intervalMs }) => {
    const [timePeriod, setTimePeriod] = useState(Object.entries(TIME_PERIODS)[0][0]);
    const [distribution, setDistribution] = useState(null);

    useEffect(() => queryEventDistributionStatistics(), [timePeriod]);
    useInterval(() => queryEventDistributionStatistics(), intervalMs);

    const queryEventDistributionStatistics = () =>
        getEventDistributionStatistics(
            Date.now() - TIME_PERIODS[timePeriod],
            Date.now(),
            statistics => setDistribution(statistics.eventDistributionPerTopic),
            () => setDistribution(undefined),
            () => setDistribution(undefined));

    return (
        <div className={`box ${wrapperClassName}`}>
            <h2 className="subtitle">Event distribution</h2>

            <div className="buttons has-addons is-centered">
                {Object.entries(TIME_PERIODS).map((period, index) => <button
                    key={index}
                    className={`button ${timePeriod === period[0] ? "is-selected is-info" : ""}`}
                    onClick={() => setTimePeriod(period[0])}>{period[0]}</button>
                )}
            </div>

            {!!distribution
                ? (
                    <DoughnutChart
                        hoverText="total events"
                        labels={Object.entries(distribution).map(entry => entry[0])}
                        datapoints={Object.entries(distribution).map(entry => entry[1])} />
                )
                : (
                    <progress className="progress is-small is-info"></progress>
                )}
        </div>
    );
};
