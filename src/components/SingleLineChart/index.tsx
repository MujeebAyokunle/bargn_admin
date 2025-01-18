import { Line } from "react-chartjs-2";

const SingleLineChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Redemptions',
                data: [30, 40, 60, 80, 100, 70, 50, 40, 30, 50, 60, 70],
                borderColor: '#4C84D4',
                backgroundColor: (context: any) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
                    gradient.addColorStop(0, 'rgba(76, 132, 212, 0.5)');
                    gradient.addColorStop(1, 'rgba(76, 132, 212, 0)');
                    return gradient;
                },
                tension: 0.4,
                pointBorderColor: '#4C84D4',
                pointBackgroundColor: '#4C84D4',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `€${context.raw}k`;
                    },
                },
            },
            legend: {
                display: false,
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

    return <Line data={data} className="w-full" options={options as any} />;
};

export default SingleLineChart;
