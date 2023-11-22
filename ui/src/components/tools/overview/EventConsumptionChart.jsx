import { useState } from "react";
import { LineChart } from "../../visualisation/LineChart";
import { useInterval } from "../../../hooks/useInterval";
import { getEventConsumptionStatistics } from "../../../services/StatisticsService";

const TIME_PERIODS = ["custom", "1h", "30m", "5m"];
const CUSTOM_PERIOD_INDEX = TIME_PERIODS.indexOf("custom");

export const EventConsumptionChart = ({ wrapperClassName, intervalMs }) => {
    const [timePeriodIndex, setTimePeriodIndex] = useState(TIME_PERIODS.length - 1);
    const [consumption, setConsumption] = useState(null);

    useInterval(() => getEventConsumptionStatistics(
        statistics => setConsumption(statistics.eventsConsumedAtTimeframe),
        () => setConsumption(undefined),
        () => setConsumption(undefined)), intervalMs);

    return (
        <div className={`box ${wrapperClassName}`}>
            <h2 className="subtitle">Event consumption</h2>

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

            {!!consumption
                ? (
                    <LineChart
                        hoverText="events consumed"
                        labels={Object.entries(consumption).map(entry => entry[0])}
                        datapoints={Object.entries(consumption).map(entry => entry[1])} />
                )
                : (
                    <progress className="progress is-small is-info"></progress>
                )}
        </div>
    );
};
