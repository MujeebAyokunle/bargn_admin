import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, LinearScale, CategoryScale);

const DoubleLineChart = () => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Last Week',
                data: [70, 60, 65, 67, 62, 75, 68],
                borderColor: '#4C84D4',
                backgroundColor: 'rgba(76, 132, 212, 0.2)',
                tension: 0.4,
                pointBorderColor: '#4C84D4',
                pointBackgroundColor: '#4C84D4',
                fill: true,
            },
            {
                label: 'This Week',
                data: [60, 65, 70, 67, 72, 78, 80],
                borderColor: '#62D1A9',
                backgroundColor: 'rgba(98, 209, 169, 0.2)',
                tension: 0.4,
                pointBorderColor: '#62D1A9',
                pointBackgroundColor: '#62D1A9',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any,) {
                        return `${context.raw} Redemptions`;
                    },
                },
            },
            legend: {
                display: true,
                position: 'bottom',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    drawBorder: false,
                },
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };

    return <Line data={data} options={options as any} />;
};

export default DoubleLineChart;
