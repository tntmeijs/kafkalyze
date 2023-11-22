import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    }
};

const colours = [
    [46, 204, 113],
    [52, 152, 219],
    [155, 89, 182],
    [52, 73, 94],
    [241, 196, 15],
    [230, 126, 34],
    [231, 76, 60],
    [149, 165, 166]
];

const tripletToRGBA = (triplet, alpha) => `rgba(${triplet[0]}, ${triplet[1]}, ${triplet[2]}, ${alpha})`;

Chart.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ className, labels, datapoints, hoverText }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: hoverText,
                data: datapoints,
                backgroundColor: datapoints.map((_, index) => tripletToRGBA(colours[index % colours.length], 0.5)),
                borderColor: datapoints.map((_, index) => tripletToRGBA(colours[index % colours.length], 1.0))
            }
        ]
    };

    return (
        <div className={className}>
            <Doughnut data={data} options={options} />
        </div>
    );
};
