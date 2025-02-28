import React from "react";
import Chart from "react-apexcharts";

// Generate 170 sample key-value pairs
// const dataObject = Object.fromEntries(
//     Array.from({ length: 170 }, (_, i) => [`Item ${i + 1}`, Math.floor(Math.random() * 500)])
// );

const LineChart = ({ dataObject = {} }: any) => {

    // Convert object to arrays
    const labels = Object.keys(dataObject);
    const values = Object.values(dataObject);

    // === LINE CHART CONFIGURATION ===
    const lineChartOptions = {
        chart: { type: "line", zoom: { enabled: false } },
        stroke: { curve: "smooth" },
        xaxis: { categories: labels, labels: { show: false } }, // Hide x-axis labels for better fit
        yaxis: { title: { text: "Value" } },
        markers: { size: 4 },
        tooltip: { theme: "dark" },
    };

    const lineChartSeries = [{ name: "Value", data: values }];

    return (
        <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={400} />
    );
};

export default LineChart;
