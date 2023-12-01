import { useEffect, useState } from "react";
import { LineChart } from "../../visualisation/LineChart";
import { useInterval } from "../../../hooks/useInterval";
import { getEventConsumptionStatistics } from "../../../services/StatisticsService";

const MAX_NUM_ENTRIES_LINE_CHART = 25;

const TIME_PERIODS = {
    "1d": 24 * 60 * 60 * 1_000,
    "1h": 60 * 60 * 1_000,
    "5m": 5 * 60 * 1_000,
    "1m": 1 * 60 * 1_000
};

export const EventConsumptionChart = ({ wrapperClassName, intervalMs }) => {
    const [timePeriodInterval, setTimePeriodInterval] = useState("5m");
    const [consumption, setConsumption] = useState(null);

    useEffect(() => queryEventConsumptionStatistics(), [timePeriodInterval]);
    useInterval(() => queryEventConsumptionStatistics(), intervalMs);

    const queryEventConsumptionStatistics = () => {
        getEventConsumptionStatistics(
            Date.now() - MAX_NUM_ENTRIES_LINE_CHART * TIME_PERIODS[timePeriodInterval],
            Date.now(),
            TIME_PERIODS[timePeriodInterval],
            MAX_NUM_ENTRIES_LINE_CHART,
            statistics => setConsumption(statistics.eventsConsumedAtTimeframe),
            () => setConsumption(undefined),
            () => setConsumption(undefined));
    };

    return (
        <div className={`box ${wrapperClassName}`}>
            <h2 className="subtitle">Event consumption</h2>

            <div className="buttons has-addons is-centered">
                {Object.entries(TIME_PERIODS).map((period, index) => <button
                    key={index}
                    disabled={period[0] === "custom"}
                    className={`button is-capitalized ${timePeriodInterval === period[0] ? "is-selected is-info" : ""}`}
                    onClick={() => setTimePeriodInterval(period[0])}>{period[0]}</button>
                )}
            </div>

            {!!consumption
                ? (
                    <LineChart
                        hoverText="events consumed"
                        labels={Object
                            .entries(consumption)
                            .map(entry => {
                                const date = new Date(Number(entry[0]));
                                return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                            })}
                        datapoints={Object.entries(consumption).map(entry => entry[1])} />
                )
                : (
                    <progress className="progress is-small is-info"></progress>
                )}
        </div>
    );
};
