import { getPages } from '@/helper/functions'
import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { redeemed_deals } from '../RedemptionHistory'
import moment from 'moment'
import { fetchUserActivityApi } from '@/apis'

function UserActivityLog({ email }: { email: string }) {
    const [pageNumber, setPageNumber] = useState(1)

    const [totalPages, setTotalPages] = useState<number>(1)
    const [fromDate, setFromDate] = useState<any>(moment().subtract(3, 'months').format('YYYY-MM-DD'))
    const [toDate, setToDate] = useState<any>(moment().format('YYYY-MM-DD'))
    const [activities, setActivities] = useState([])

    useEffect(() => {
        initialize()
    }, [pageNumber, fromDate, toDate])

    const initialize = async () => {
        let json = {
            userId: email,
            fromDate,
            toDate,
            page: pageNumber
        }

        fetchUserActivityApi(json, response => {
            if (!response?.error) {
                // console.log(response)
                setPageNumber(response?.page)
                setTotalPages(response?.totalPages)
                setActivities(response?.events)
            }
        })
    }

    const onPageChange = (page: number) => {
        setPageNumber(page)
    }

    return (
        <div >
            {/* FIlter section */}
            <div className='mt-4 space-x-5 flex items-end' >

                <div className='space-y-1 w-[20%]' >
                    <p className='text-[#111827] font-medium text-sm' >From</p>

                    <div className='flex items-center space-x-1 w-full px-2 h-10 bg-white rounded-md border border-[#E5E7EB]' >
                        <input type="date" placeholder='Select Date' value={fromDate} className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' onChange={(event) => setFromDate(event.target.value)} />
                    </div>
                </div>

                <div className='space-y-1 w-[20%]' >
                    <p className='text-[#111827] font-medium text-sm' >To</p>

                    <div className='flex items-center px-2 h-10 bg-white rounded-md border border-[#E5E7EB] w-full' >
                        <input value={toDate} type="date" placeholder='Select Date' className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' onChange={(event) => setToDate(event.target.value)} />
                    </div>
                </div>

                {/* <button className='bg-[#A5B4FC] h-10 text-[#E0E7FF] border border-[#818CF8] rounded-md p-1 px-5' >Search</button> */}
            </div>

            {/* Table */}
            <div className='p-4 border mt-8 bg-white border-[#D9D9D9] rounded-lg'>
                <table className="w-full mt-4 table-auto text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2  ps-4 text-sm font-medium text-gray-700">Date & Time</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Action</th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activities?.length > 0 && (
                                <>
                                    {activities.map((activity: any, index) => (
                                        <tr
                                            key={index}
                                            className="border-b"
                                        >
                                            <td className="p-4 flex items-center space-x-4">

                                                <p className="text-sm font-medium text-[#111827]">
                                                    {moment.unix(activity?.properties.time).format("MMM DD, YYYY, HH:MM A")}
                                                </p>
                                            </td>
                                            <td className="p-4 text-sm text-[#111827]">{activity.event}</td>
                                            <td className="p-4 text-sm text-[#111827]">{`OS: ${activity?.properties?.$os}, region:${activity?.properties?.$region}`}</td>
                                        </tr>
                                    ))}
                                </>
                            )
                        }
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="m-4 flex justify-between items-center mt-6">
                    <button onClick={() => {
                        if (pageNumber > 1)
                            setPageNumber(prev => prev - 1)
                    }} className="px-4 flex items-center justify-center py-2 bg-[#F9FAFB] border border-[#E5E7EB] text-gray-700 rounded-lg hover:bg-gray-300">
                        <FiChevronLeft size={20} />
                        Previous
                    </button>
                    <div className="flex space-x-2">
                        {getPages(pageNumber, totalPages).map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === "number" && onPageChange(page)}
                                className={`px-3 py-2 rounded-lg ${page === pageNumber
                                    ? "bg-[#EEF2FF] border border-[#6366f1] text-[#6366f1]"
                                    : "bg-[#F9FAFB] border border-[#E5E7EB] text-gray-700 hover:bg-gray-300"
                                    }`}
                                disabled={page === "..."}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => {
                        if (pageNumber < totalPages)
                            setPageNumber(prev => prev + 1)
                    }} className="px-4 py-2 flex justify-center items-center space-x-2 bg-[#F9FAFB] border border-[#E5E7EB] text-gray-700 rounded-lg hover:bg-gray-300">
                        Next
                        <FiChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserActivityLog