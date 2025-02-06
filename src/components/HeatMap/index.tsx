"use client"
import React from 'react'
import Chart from 'react-apexcharts';

function HeatMap() {

    const options = {
        chart: {
            type: 'heatmap',
            toolbar: { show: false }
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: -1, to: -0.1, color: "#2E86C1", name: "Low" }, // Cool Blue
                        { from: 0, to: 0, color: "#F39C12", name: "Neutral" }, // Warm Amber
                        { from: 0.1, to: 1, color: "#E74C3C", name: "High" }, // Vibrant Red
                    ],
                }
            }
        },
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
    };

    const series = [
        {
            name: "Cluster A",
            data: [-0.8, 0.2, -0.5, 0.7, -0.3, 0, 0.9],
        },
        {
            name: "Cluster B",
            data: [-0.6, -0.2, 0.1, 0.4, 0.3, -0.1, 0.8],
        },
        {
            name: "Cluster C",
            data: [-0.9, 0.5, -0.4, 0.2, 0.6, 0, 1],
        },
    ];

    return (
        <Chart options={options as any} series={series} type="heatmap" height={400} style={{ width: "100%" }} />
    )
}

export default HeatMap