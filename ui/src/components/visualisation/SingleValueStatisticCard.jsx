export const SingleValueStatisticCard = ({ title, value, unit, colour, loading, wrapperClassName }) => (
    <div className={`card highlight-bottom ${colour} ${wrapperClassName}`}>
        <div className="card-content is-uppercase">
            <div className="content">
                <p className="subtitle is-6">{title}</p>
                {loading
                    ? (
                        <div>
                            <progress class={`progress is-small ${colour}`}></progress>
                        </div>
                    )
                    : (
                        <p className="title is-4 pt-2">
                            <span className="mr-2">{value}</span>
                            <span className="has-text-weight-light">{unit}</span>
                        </p>
                    )}
            </div>
        </div>
    </div>
);
