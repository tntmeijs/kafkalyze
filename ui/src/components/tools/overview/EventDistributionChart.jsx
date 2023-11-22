import { useState } from "react";
import { DoughnutChart } from "../../visualisation/DoughnutChart";
import { useInterval } from "../../../hooks/useInterval";
import { getEventDistributionStatistics } from "../../../services/StatisticsService";

const TIME_PERIODS = ["custom", "1h", "30m", "5m"];
const CUSTOM_PERIOD_INDEX = TIME_PERIODS.indexOf("custom");

export const EventDistributionChart = ({ wrapperClassName, intervalMs }) => {
    const [timePeriodIndex, setTimePeriodIndex] = useState(TIME_PERIODS.length - 1);
    const [distribution, setDistribution] = useState(null);

    useInterval(() => getEventDistributionStatistics(
        statistics => setDistribution(statistics.eventDistributionPerTopic),
        () => setDistribution(undefined),
        () => setDistribution(undefined)), intervalMs);

    return (
        <div className={`box ${wrapperClassName}`}>
            <h2 className="subtitle">Event distribution</h2>

            <div className="buttons has-addons is-centered">
                {TIME_PERIODS.map((period, index) => <button
                    key={index}
                    className={`button is-capitalized ${timePeriodIndex === index ? "is-selected is-info" : ""}`}
                    onClick={() => setTimePeriodIndex(index)}>{period}</button>
                )}
            </div>

            {timePeriodIndex === CUSTOM_PERIOD_INDEX && (
                <div className="buttons has-addons is-centered">
                    <input className="button is-capitalized" type="date" />
                    <input className="button is-capitalized" type="date" />
                </div>
            )}

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
