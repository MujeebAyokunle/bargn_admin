import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data1 = [], dataLabels = [], data1_label, data2 = [], data2_label }: any) => {
    const data = {
        labels: dataLabels?.length > 0 ? dataLabels : [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: data1_label,
                data: data1,
                backgroundColor: "#3366FF",
                borderRadius: 4,
                borderSkipped: false,
            },
            {
                label: data2_label,
                data: data2,
                backgroundColor: "#D1D5DB",
                borderRadius: 4,
                borderSkipped: false,
            },
        ],
    };

    const options: any = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) =>
                        `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
            },
            legend: {
                display: false,
                position: "top",
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                },
                grid: {
                    color: "#E5E7EB",
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "auto", margin: "0 auto" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
