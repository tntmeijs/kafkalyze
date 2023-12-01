import { useEffect, useState } from "react";
import { LineChart } from "../../visualisation/LineChart";
import { useInterval } from "../../../hooks/useInterval";
import { getEventConsumptionStatistics } from "../../../services/StatisticsService";

const MAX_NUM_ENTRIES_LINE_CHART = 25;

const TIME_PERIODS = {
    "1 day": 24 * 60 * 60 * 1_000,
    "1 hour": 60 * 60 * 1_000,
    "5 minutes": 5 * 60 * 1_000,
    "1 minute": 1 * 60 * 1_000
};

export const EventConsumptionChart = ({ wrapperClassName, intervalMs }) => {
    const [timePeriod, setTimePeriod] = useState(Object.entries(TIME_PERIODS)[0][0]);
    const [consumption, setConsumption] = useState(null);

    useEffect(() => queryEventConsumptionStatistics(), [timePeriod]);
    useInterval(() => queryEventConsumptionStatistics(), intervalMs);

    const queryEventConsumptionStatistics = () =>
        getEventConsumptionStatistics(
            Date.now() - MAX_NUM_ENTRIES_LINE_CHART * TIME_PERIODS[timePeriod],
            Date.now(),
            TIME_PERIODS[timePeriod],
            MAX_NUM_ENTRIES_LINE_CHART,
            statistics => setConsumption(reverseObjectKeysByOrder(statistics.eventsConsumedAtTimeframe)),
            () => setConsumption(undefined),
            () => setConsumption(undefined));

    const reverseObjectKeysByOrder = originalObject => {
        const keysArray = Object.keys(originalObject);
        const reversedKeysArray = keysArray.reverse();

        const reversedObject = {};
        reversedKeysArray.forEach(key => {
            reversedObject[key] = originalObject[key];
        });

        return reversedObject;
    };

    return (
        <div className={`box ${wrapperClassName}`}>
            <h2 className="subtitle">Event consumption</h2>

            <div className="buttons has-addons is-centered">
                {Object.entries(TIME_PERIODS).map((period, index) => <button
                    key={index}
                    className={`button ${timePeriod === period[0] ? "is-selected is-info" : ""}`}
                    onClick={() => setTimePeriod(period[0])}>{period[0]}</button>
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
