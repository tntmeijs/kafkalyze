import { DashboardStatisticCard } from "../components/DashboardStatisticCard";

export const OverviewPage = () => {
    return (
        <div className="box">
            <div className="columns">
                <div className="column">
                    <DashboardStatisticCard title="events per minute" value="18.337" colour="is-info" />
                </div>
                <div className="column">
                    <DashboardStatisticCard title="total events stored" value="7.500.000" colour="is-danger" />
                </div>
                <div className="column">
                    <DashboardStatisticCard title="database size" value={12.6} unit="GB" colour="is-warning" />
                </div>
                <div className="column">
                    <DashboardStatisticCard title="number of topics" value={232} colour="is-success" />
                </div>
            </div>
        </div>
    );
};
