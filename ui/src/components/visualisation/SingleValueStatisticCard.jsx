export const SingleValueStatisticCard = ({ title, value, unit, colour }) => (
    <div className="card">
        <div className={`card-content highlight-bottom is-uppercase ${colour}`}>
            <div className="content">
                <p className="subtitle is-6 mb-5">{title}</p>
                <p className="title is-4"><span className="mr-2">{value}</span><span className="has-text-weight-light">{unit}</span></p>
            </div>
        </div>
    </div>
);
