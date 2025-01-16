"use client"
import Nav from '@/components/Nav'
import { LineChart } from '@/components/Svgs/icons'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { GrShare } from 'react-icons/gr';
import { Chart, ArcElement } from 'chart.js';
import { SlOptions, SlOptionsVertical } from 'react-icons/sl';
import { CiFilter } from 'react-icons/ci';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchDashboardData, fetchPagedDashboardSalesData } from '@/lib/features/dashboardSlice';
// import { RootState } from '@/lib/store';
import { generateColorsAndDarkerVariants, getPages, getRandomColorWithAlpha } from '@/helper/functions';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa6';
import DashboardLineChart from '@/components/DashboardLineChart';
import BarChart from '@/components/Barchart';
import { fetchDashboardData } from '@/lib/features/dashboardSlice';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    cutout: "70%", // Creates the donut effect
    plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
    },
};

const statusClasses: any = {
    active: "bg-green-100 text-green-700",
    archived: "bg-red-100 text-red-700",
    processing: "bg-blue-100 text-blue-700",
    drafts: "bg-gray-100 text-gray-700",
};

const performing_deals = [
    {
        title: "Rejuvenating Winter Wellness Retreat",
        subtitle: "Jyvaskyla Garden Hotel",
        number: 264
    },
    {
        title: "A Luxurious City Escape",
        subtitle: "Nordic Fireside Dining",
        number: 170
    },
    {
        title: "Nordic Fireside Dining",
        subtitle: "Arctic Breeze Restaurant",
        number: 170
    },
    {
        title: "Rejuvenating Winter Wellness Retreat",
        subtitle: "Jyvaskyla Garden Hotel",
        number: 264
    }
];

const options_dough = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "right",
            labels: {
                boxWidth: 15,
                padding: 10,
                usePointStyle: true,
            },
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem: any) {
                    const label = tooltipItem.label || "";
                    const value = tooltipItem.raw || 0;
                    return `${label}: ${value}%`;
                },
            },
        },
    },
    cutout: "70%", // Adjusts the thickness of the donut
};

function sortDataByMonth(data: any) {
    const monthOrder = [
        'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
    ];

    const sortedArray = monthOrder.map(month => data[month]);

    return sortedArray;
}

function Dashboard() {

    Chart.register(ArcElement)

    const dispatch: any = useDispatch()
    const router = useRouter()
    const { dashboardData } = useSelector((data: any) => data.dashboard)

    useEffect(() => {

        const cookie = Cookies.get("token")
        if (!cookie) {
            router.push("/")
            return
        }
        dispatch(fetchDashboardData())

    }, [])

    const cities = [
        {
            city: "Helsinki",
            percentage: "20%",
            color: "#F881CA"
        },
        {
            city: "Oulu",
            percentage: "53%",
            color: "#F18963"
        },
        {
            city: "Tempere",
            percentage: "22%",
            color: "#D1D117"
        },
        {
            city: "Tempere",
            percentage: "22%",
            color: "#D1D117"
        },
        {
            city: "Tempere",
            percentage: "22%",
            color: "#D1D117"
        },
        {
            city: "Tempere",
            percentage: "22%",
            color: "#D1D117"
        },
        {
            city: "Tempere",
            percentage: "22%",
            color: "#D1D117"
        },
        {
            city: "Tempere",
            percentage: "22%",
            color: "#D1D117"
        },
        {
            city: "Tempere",
            percentage: "22%",
            color: "#D1D117"
        }
    ]

    const redeem_pie: any = dashboardData ? generateColorsAndDarkerVariants(Object.keys(dashboardData?.redeemed_categories_total_percentage)?.length) : {}
    const device_type_pie = generateColorsAndDarkerVariants(2)

    const redeemed_pie_data = {
        labels: dashboardData?.redeemed_categories_total_percentage ? Object.keys(dashboardData?.redeemed_categories_total_percentage) : [],
        // labels: dashboardData?.redeemed_categories_total_percentage ? Object.keys(dashboardData?.redeemed_categories_total_percentage) : [],
        datasets: [
            {
                data: dashboardData?.redeemed_categories_total_percentage
                    ? Object.values(dashboardData?.redeemed_categories_total_percentage)
                    : [],
                backgroundColor: dashboardData?.redeemed_categories_total_percentage
                    ? redeem_pie?.colors
                    : [],
                hoverBackgroundColor: dashboardData?.redeemed_categories_total_percentage
                    ? redeem_pie?.darkerColors
                    : [],
            },
        ],
    };

    const users_device_pie_data = {
        labels: ["iOS", "Android"],
        datasets: [
            {
                data: [dashboardData?.ios_percentage || 0, dashboardData?.android_percentage || 0],
                backgroundColor: device_type_pie?.colors,
                hoverBackgroundColor: device_type_pie?.darkerColors,
            },
        ],
    };

    const activeBusinessData = sortDataByMonth(dashboardData?.merchant_engagement_metrics)
    const sortedActiveBusinessData: any = activeBusinessData?.map((data: any) => data?.active)
    const inactiveBusinessData: any = activeBusinessData?.map((data: any) => data?.inactive)



    const mobile_insights = dashboardData?.mobile_insights ? Object.keys(dashboardData?.mobile_insights).map(category => {
        const data = dashboardData?.mobile_insights[category].map((item: any) => item.totalCount || 0); // Use 0 if no totalCount available

        const colorWithAlpha = getRandomColorWithAlpha()

        return {
            label: category,
            data: data,
            borderColor: colorWithAlpha?.color, // Example, change as necessary
            backgroundColor: colorWithAlpha?.rgbaColor, // Example, change as necessary
            tension: 0.4,
            fill: true,
        };
    }) : []

    return (
        <Nav>
            <div className='p-4'>
                <div className="mb-6 w-full">
                    <h1 className="text-2xl text-[#0A0909] font-bold">Analytics</h1>

                    <div className='w-full mt-4'>
                        {/* Revenue analytics */}
                        <div className='flex w-full mb-4'>
                            <div className='w-[25%] p-4 space-y-1 border bg-white border-[#D9D9D9] rounded-tl-lg rounded-bl-lg'>
                                <p className='text-[#6B7280] font-medium text-[16px]'>Total Revenue</p>
                                <p className='text-[#1F2937] font-bold text-[32px]'>€ {dashboardData?.total_revenue_amount || 0}</p>

                                {/* last month metrics */}
                                <div className='flex items-center space-x-1'>
                                    <div className='flex flex-row justify-center items-center space-x-2 bg-[#F0FDF4] px-2 rounded-full'>
                                        <LineChart />
                                        <p className='text-[#22C55E] text-[12px] font-medium'>{`${dashboardData?.revenuePercentageIncrease || 0}%`}</p>
                                    </div>
                                    <p className='text-[#1F2937] text-[14px] font-normal'>from last month</p>
                                </div>
                            </div>

                            <div className='w-[25%] p-4 border bg-white border-[#D9D9D9] space-y-1'>
                                <p className='text-[#6B7280] font-medium text-[16px]'>Redeemed Deals</p>
                                <p className='text-[#1F2937] font-bold text-[32px]'>{dashboardData?.total_redeemed_count || 0}</p>

                                {/* last month redeemed deals metrics */}
                                <div className='flex items-center space-x-1'>
                                    <div className='flex flex-row justify-center items-center space-x-2 bg-[#F0FDF4] px-2 rounded-full'>
                                        <LineChart />
                                        <p className='text-[#22C55E] text-[12px] font-medium'>{`${dashboardData?.activePercentageIncrease || 0}%`}</p>
                                    </div>
                                    <p className='text-[#1F2937] text-[14px] font-normal'>from last month</p>
                                </div>
                            </div>
                            <div className='w-[25%] p-4 border bg-white border-[#D9D9D9] space-y-1'>
                                <p className='text-[#6B7280] font-medium text-[16px]'>Customers</p>
                                <p className='text-[#1F2937] font-bold text-[32px]'>{dashboardData?.total_customers || 0}</p>

                                {/* customers last month metrics */}
                                <div className='flex items-center space-x-1'>
                                    <div className='flex flex-row justify-center items-center space-x-2 bg-[#F0FDF4] px-2 rounded-full'>
                                        <LineChart />
                                        <p className='text-[#22C55E] text-[12px] font-medium'>{`${dashboardData?.activePercentageIncrease || 0}%`}</p>
                                    </div>
                                    <p className='text-[#1F2937] text-[14px] font-normal'>from last month</p>
                                </div>
                            </div>
                            <div className='w-[25%] space-y-1 p-4 border bg-white rounded-tr-lg rounded-br-lg border-[#D9D9D9]'>
                                <p className='text-[#6B7280] font-medium text-[16px]'>Total Sales</p>
                                <p className='text-[#1F2937] font-bold text-[32px]'>{dashboardData?.total_sales || 0}</p>

                                <div className='flex items-center space-x-1'>
                                    <div className='flex flex-row justify-center items-center space-x-2 bg-[#F0FDF4] px-2 rounded-full'>
                                        <LineChart />
                                        <p className='text-[#22C55E] text-[12px] font-medium'>{`${dashboardData?.redeemedDealsPercentageIncrease || 0}%`}</p>
                                    </div>
                                    <p className='text-[#1F2937] text-[14px] font-normal'>from last month</p>
                                </div>
                            </div>
                        </div>

                        {/* mobile app insights */}
                        <div className='p-4 border bg-white border-[#D9D9D9] rounded-lg '>
                            <div className='flex justify-between items-center' >
                                <p className='text-[#9CA3AF] text-[16px] font-bold'>Mobile App Insights</p>

                            </div>

                            <div className='my-6 flex h-auto w-full justify-center items-center'>
                                {/* <p className='text-black'>chart</p> */}
                                <DashboardLineChart mobile_insights={mobile_insights} />
                            </div>
                        </div>

                        {/* Sales analytics section */}
                        <div className="min-h-48 mt-6 rounded-lg flex space-x-4 flex-row">
                            {/* Sales history */}
                            <div className="w-[34%] h-full space-y-4">
                                {/* total deals redeemed */}
                                <div className='w-full bg-white h-[48.5%] rounded border border-[#D9D9D9] p-4' >
                                    <div className='flex flex-row justify-between items-center' >
                                        <p className='text-black w-[65%] text-[12px] font-medium' >Deals performance by category</p>

                                        <div className='flex flex-row items-center justify-between space-x-1' >
                                            <p className='text-black font-medium text-[12px]' >This week</p>

                                            <FaChevronDown size={12} color='black' />
                                        </div>
                                    </div>

                                    {/* total redeemed deals */}
                                    <div className='mt-2' >
                                        <p className='text-black font-normal text-[12px]' >Total Deals Redeemed</p>
                                        <p className='text-[#165BAA] font-normal text-[28px]' >{dashboardData?.total_redeemed_count || 0}</p>

                                        <div className='-mt-4' >
                                            <Doughnut data={redeemed_pie_data} options={options_dough as any} />
                                        </div>
                                    </div>
                                </div>

                                {/* active users by device */}
                                <div className='w-full bg-white h-[48.5%] rounded border border-[#D9D9D9] p-4' >
                                    <div className='flex flex-row justify-between items-center' >
                                        <p className='text-black w-[65%] text-[12px] font-medium' >Active users by device</p>

                                        <div className='flex flex-row items-center justify-between space-x-1' >
                                            <p className='text-black font-medium text-[12px]' >This week</p>

                                            <FaChevronDown size={12} color='black' />
                                        </div>
                                    </div>
                                    <div className='mt-2' >
                                        <p className='text-[#165BAA] font-normal text-[28px]' >{dashboardData?.total_device_type || 0}</p>

                                        <div >
                                            <Doughnut data={users_device_pie_data} options={options_dough as any} />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Sales mapping per location */}
                            <div className='w-[66%] bg-white p-6 h-full border border-[#D9D9D9]' >
                                <div className='flex justify-between items-center' >
                                    <p className='text-[#6B7280] text-base font-medium' >Users Traffic Per Location</p>

                                    <div className='flex items-center justify-center' >
                                        <div className='flex items-center justify-center px-3 h-[35px] border border-[#E5E7EB] rounded-tl-lg rounded-bl-lg' >
                                            <p className='text-[#1F2937]' >Finland</p>
                                        </div>
                                        <div className='h-[35px] px-3 justify-center items-center flex border border-[#E5E7EB] rounded-tr-lg rounded-br-lg' >
                                            <FaChevronDown color='#1F2937' />
                                        </div>
                                    </div>
                                </div>

                                {/* maps and popular cities */}
                                <div className='flex flex-row space-x-8 mt-4' >
                                    <div className='w-[30%]' >
                                        <img alt='map' src='/images/Finland.png' className='w-full h-[400px]' />
                                    </div>
                                    <div className='flex-1'>
                                        <p className='font-medium text-base text-[#6B7280]' >Popularity by Cities</p>

                                        <div className='mt-4 space-y-4'>
                                            {
                                                cities.map((data: any, index: number) => (
                                                    <div key={index}>
                                                        <div className='flex items-center justify-between' >
                                                            <p className='text-[#111827] text-[12px] font-medium' >{data?.city}</p>
                                                            <p className='text-[#111827] text-[12px] font-medium'>{data.percentage}</p>
                                                        </div>
                                                        <div className='h-[5px] mt-1 rounded-full w-full bg-[#E5E7EB]'>
                                                            <div style={{ width: data.percentage, backgroundColor: data.color }} className={`h-full rounded-full`} ></div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* merchant engagement metrics */}
                        <div className='p-4 border mt-8 bg-white border-[#D9D9D9] rounded-lg '>
                            <div className='flex justify-between items-center' >
                                <p className='text-[#1F2937] font-semibold text-[21px] ' >Merchant Engagement Metrics</p>

                                <div className='flex items-center space-x-2' >
                                    <div className='flex items-center space-x-1' >
                                        <div className='bg-[#2563EB] w-[10PX] h-[10px] rounded-[5px]' />
                                        <p className='text-[12px] font-normal text-[#1F2937]' >Active Business</p>
                                    </div>

                                    <div className='flex items-center space-x-1' >
                                        <div className='bg-[#CBD5E1] w-[10PX] h-[10px] rounded-[5px]' />
                                        <p className='text-[12px] font-normal text-[#1F2937]' >Inactive Business</p>
                                    </div>
                                </div>
                            </div>

                            {/* Barchart */}
                            <div className='mt-4' >
                                <BarChart data1={sortedActiveBusinessData} data1_label="Active Business" data2={inactiveBusinessData} data2_label="Inactive Business" />
                            </div>
                        </div>

                        {/* Sales analytics table */}
                        <div className='flex flex-row items-start justify-start space-x-4 mt-4' >

                            {/* Redemptionhistory */}
                            <div className='w-[32%] p-6 bg-white h-full border border-[#D9D9D9]' >
                                <p className='text-[#111827] text-lg font-semibold' >Redemption History</p>

                                <div className='mt-4' >
                                    <div className='space-y-3' >
                                        {
                                            dashboardData?.redemption_history?.map((data: any, index: number) => (
                                                <div key={index} className='flex mt-3 space-x-2 items-center w-full' >
                                                    <img src={data?.user?.profile_picture} alt='avatar' style={{ borderRadius: 20, width: 40, height: 40 }} />

                                                    <div className='flex w-full justify-between items-center' >
                                                        <div>
                                                            <p className='text-[#404040] font-semibold text-sm' >{data?.user?.full_name}</p>
                                                            <p className='text-[#565656] font-medium text-[12px]' >{data?.location}</p>
                                                        </div>
                                                        <p className='text-[#1F2937] font-medium text-sm' >€{data?.revenue}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>


                            {/* Top performing deals */}
                            <div className='p-4 border w-[68%] bg-white border-[#D9D9D9] rounded-lg overflow-x-scroll'>
                                <div className='my-2 pb-2 flex items-center justify-between' >
                                    <p className='text-[#111827] text-lg font-semibold' >Top Performing Deals</p>

                                </div>

                                {/* Top performing deals */}
                                <div className='space-y-2' >
                                    {
                                        dashboardData?.top_performing_deals?.map((deal: any, index: number) => (
                                            <div key={index} className='flex items-center justify-between border-b py-1' >
                                                <div>
                                                    <p className='text-[#111827] font-semibold text-base' >{deal?.name}</p>
                                                    <p className='text-[#6B7280] font-normal text-[12px]'>{deal?.category}</p>
                                                </div>

                                                <p className='text-[#111827] font-semibold text-base' >{deal?.count} <span className='text-[#4B5563] font-normal text-sm' >redemptions</span></p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Nav>
    )
}

export default Dashboard