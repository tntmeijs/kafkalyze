import { useState } from "react";
import { DoughnutChart } from "../../visualisation/DoughnutChart";

const TIME_PERIODS = ["custom", "1h", "30m", "5m"];
const CUSTOM_PERIOD_INDEX = TIME_PERIODS.indexOf("custom");

export const EventDistributionChart = ({ wrapperClassName, eventDistributionPerTopic }) => {
    const [timePeriodIndex, setTimePeriodIndex] = useState(TIME_PERIODS.length - 1);

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

            {eventDistributionPerTopic && (
                <DoughnutChart
                    hoverText="total events"
                    labels={Object.entries(eventDistributionPerTopic).map(entry => entry[0])}
                    datapoints={Object.entries(eventDistributionPerTopic).map(entry => entry[1])} />
            )}
        </div>
    );
};
