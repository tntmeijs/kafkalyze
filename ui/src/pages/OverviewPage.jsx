import { AreaChart } from "../components/visualisation/AreaChart";
import { DoughnutChart } from "../components/visualisation/DoughnutChart";
import { SingleValueStatisticCard } from "../components/visualisation/SingleValueStatisticCard";

export const OverviewPage = () => {
    return (
        <div className="box">
            <div className="columns">
                <div className="column">
                    <SingleValueStatisticCard title="events per hour" value="18.000" colour="is-info" />
                </div>
                <div className="column">
                    <SingleValueStatisticCard title="total events stored" value="7.500.000" colour="is-danger" />
                </div>
                <div className="column">
                    <SingleValueStatisticCard title="database size" value={12.6} unit="GB" colour="is-warning" />
                </div>
                <div className="column">
                    <SingleValueStatisticCard title="number of topics" value={236} colour="is-success" />
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
