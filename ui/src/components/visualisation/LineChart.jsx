import { CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

const labels = [
    "00:00:00",
    "00:00:05",
    "00:00:10",
    "00:00:15",
    "00:00:20",
    "00:00:25",
    "00:00:30",
    "00:00:35",
    "00:00:45",
    "00:00:50",
    "00:00:55",
    "00:01:00",
    "00:01:05",
    "00:01:10",
    "00:01:15",
    "00:01:20",
    "00:01:25",
    "00:01:30",
    "00:01:35",
    "00:01:45",
    "00:01:50",
    "00:01:55",
    "00:02:00",
    "00:02:05",
    "00:02:10",
    "00:02:15",
    "00:02:20",
    "00:02:25",
    "00:02:30",
    "00:02:35",
    "00:02:45",
    "00:02:50",
    "00:02:55"
];

const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: "Dataset 1",
            data: labels.map(() => Math.round(Math.random() * 100)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        }
    }
};

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const LineChart = ({ title, wrapperClassName }) => {
    return (
        <div className={`box ${wrapperClassName}`}>
            {title && <h2 className="subtitle">{title}</h2>}
            <Line data={data} options={options} />
        </div>
    );
};
