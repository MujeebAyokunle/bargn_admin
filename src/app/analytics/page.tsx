"use client"

import { FetchAnalyticsData } from '@/apis'
import BarChart from '@/components/Barchart'
import HeatMap from '@/components/HeatMap'
import Nav from '@/components/Nav'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

function Analytics() {

    const [reviews, setReviews] = useState<any>([])
    const [categoriesData, setCategoriesData] = useState<any>([])
    const [categories, setCategories] = useState<any>([])
    const [gplayRating, setgplayRating] = useState(0)
    const [androidPercentage, setandroidPercentage] = useState(0)
    const [iosPercentage, setiosPercentage] = useState(0)
    const [sentimentData, setsentimentData] = useState(0)


    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const response = await FetchAnalyticsData()
        // console.log(response)
        if (!response.error) {
            setReviews(response.appStoreReviewsData)
            setgplayRating(response.gplayRating)
            setandroidPercentage(response.androidPercentage)
            setiosPercentage(response.iosPercentage)
            setsentimentData(response.sentimentData)

            let temp = response?.dealsByCategoryCount
            let categoriesTemp = Object.keys(temp)

            let DataArray = categoriesTemp.map((category: any) => (temp[category]))

            setCategories(categoriesTemp)
            setCategoriesData(DataArray)
        }
    }

    return (
        <Nav>
            <div className='p-4'>
                <div className="mb-6 w-full">
                    <h1 className="text-2xl text-[#0A0909] font-bold">Analytics</h1>

                    {/* Acquisition channel and app store ranking */}
                    <div className='flex justify-between items-start w-full h-auto mt-8' >
                        <div className='w-[49%] rounded-lg' >
                            {/* Acquisition channel */}
                            <div className='w-full rounded-lg border-2' style={{ borderColor: "rgba(0,0,0,0.05)" }} >
                                <div className='flex' >
                                    <div className='w-1/2 p-8' >
                                        <p className='text-[#333] text-base font-semibold' >Android</p>
                                        <p className='text-black font-bold text-[24px]' >{androidPercentage?.toFixed(1)}%</p>
                                    </div>
                                    <div className='w-1/2 p-8' >
                                        <p className='text-[#333] text-base font-semibold' >iOS</p>
                                        <p className='text-black font-bold text-[24px]' >{iosPercentage?.toFixed(1)}%</p>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: "rgba(0,0,0,0.05)" }} className='p-4 rounded-bl-lg rounded-br-lg' >
                                    <p className='text-[#333] text-sm font-semibold' >Acquisition channel</p>
                                </div>
                            </div>
                        </div>

                        {/* App store ranking */}
                        <div className='w-[49%] rounded-lg'>
                            <div className='w-full rounded-lg border-2' style={{ borderColor: "rgba(0,0,0,0.05)" }} >
                                <div className='flex' >
                                    <div className='w-1/2 p-8' >
                                        <p className='text-[#333] text-base font-semibold' >PlayStore</p>
                                        <p className='text-black font-bold text-[24px]' >{gplayRating}</p>
                                    </div>
                                    <div className='w-1/2 p-8' >
                                        <p className='text-[#333] text-base font-semibold' >AppStore</p>
                                        <p className='text-black font-bold text-[24px]' >0/5</p>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: "rgba(0,0,0,0.05)" }} className='p-4 rounded-bl-lg rounded-br-lg' >
                                    <p className='text-[#333] text-sm font-semibold' >App store ranking</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sentiment heatmap */}
                    <div className='flex justify-between items-start w-full mt-8' >
                        <div className='w-[49%] rounded-lg' >
                            {/* Sentiment heatmap */}
                            <div className='w-full rounded-lg border-2' style={{ borderColor: "rgba(0,0,0,0.05)" }} >
                                <div className='flex p-4' >

                                    <HeatMap data={sentimentData} />
                                </div>

                                <div style={{ backgroundColor: "rgba(0,0,0,0.05)" }} className='p-4 rounded-bl-lg rounded-br-lg' >
                                    <p className='text-[#333] text-sm font-semibold' >Sentiment Map</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-[49%] rounded-lg' >
                            {/* Sentiment heatmap */}
                            <div className='w-full rounded-lg border-2' style={{ borderColor: "rgba(0,0,0,0.05)" }} >
                                <div className='flex items-end p-4 h-[445px]' >
                                    <BarChart dataLabels={categories} data={categoriesData} />
                                </div>

                                <div style={{ backgroundColor: "rgba(0,0,0,0.05)" }} className='p-4 rounded-bl-lg rounded-br-lg' >
                                    <p className='text-[#333] text-sm font-semibold' >Revenue attribution</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* App store and play store reviews */}
                    <div className='p-4 border mt-10 bg-white border-[#D9D9D9] rounded-lg'>
                        <p className='text-black text-base font-semibold' >App reviews</p>
                        {/* table */}
                        <table className="w-full mt-4 table-auto text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2 ps-6 text-sm font-medium text-gray-700">Name</th>
                                    <th className="p-2 text-sm font-medium text-gray-700">Email</th>
                                    <th className="p-2 text-sm font-medium text-gray-700" style={{ width: "40%" }}>
                                        Review
                                    </th>
                                    <th className="p-2 text-sm font-medium text-gray-700">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((user: any, index: number) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50 transition cursor-pointer duration-150"
                                    >
                                        <td className="p-4 flex items-center space-x-4">
                                            <span className="text-sm font-medium text-[#111827]">
                                                {user.full_name}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#111827]">{user.email}</td>
                                        <td className="p-4 text-sm text-[#111827]">{user.review}</td>
                                        <td className="p-4 text-sm text-[#111827]">{user.createdAt ? moment(user.createdAt).local().format('D MMMM YYYY') : ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Nav >
    )
}

export default Analytics