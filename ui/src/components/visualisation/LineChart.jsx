import { CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

const options = {
    responsive: true,
    pointHitRadius: Number.MAX_SAFE_INTEGER,
    plugins: {
        legend: {
            display: false
        }
    }
};

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const LineChart = ({ className, labels, datapoints, hoverText }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                fill: true,
                label: hoverText,
                data: datapoints,
                borderColor: "rgb(52, 152, 219)",
                backgroundColor: "rgba(52, 152, 219, 0.5)"
            }
        ]
    };

    console.log(labels);

    return (
        <div className={className}>
            <Line data={data} options={options} />
        </div>
    );
};
