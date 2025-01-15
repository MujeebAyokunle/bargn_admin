import { fetchUserRedemptionApi } from '@/apis'
import { getPages } from '@/helper/functions'
import moment from 'moment'
import { init } from 'next/dist/compiled/webpack/webpack'
import React, { use, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const redeemed_deals = [
    {
        date: new Date(),
        business: "MJ Electronics",
        category: "travel & hotels",
        details: "A Cozy Dinner by the Lakeside",
        offer_expiry: new Date(),
        status: "active"
    },
    {
        date: new Date(),
        business: "MJ Electronics",
        category: "travel & hotels",
        details: "A Cozy Dinner by the Lakeside",
        offer_expiry: new Date(),
        status: "progress"
    }
]

function RedemptionHistory({ id }: { id: any }) {

    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [offer, setOffer] = useState("")
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [redemptionData, setRedemptionData] = useState([])

    useEffect(() => {
        // fetch data
        init()
    }, [pageNumber, offer, fromDate, toDate])

    const init = () => {
        let json = {
            pageNumber,
            user_id: parseInt(id),
            status: offer,
            from_date: fromDate,
            to_date: toDate
        }

        fetchUserRedemptionApi(json, response => {

            if (!response?.error) {
                setTotalPages(response?.totalPages)
                setRedemptionData(response?.redemption_history)
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
                    <p className='text-[#111827] font-medium text-sm' >Offer</p>

                    <select className='flex text-[#6B7280] text-sm w-full items-center px-2 h-10 bg-white hover:outline-none rounded-md border border-[#E5E7EB]' onChange={(event) => {
                        setOffer(event.target.value)
                    }} >
                        <option value="">All</option>
                        <option value="redeemed">Redeemed</option>
                        <option value="pending">Progress</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className='space-y-1 w-[20%]' >
                    <p className='text-[#111827] font-medium text-sm' >From</p>

                    <div className='flex items-center space-x-1 w-full px-2 h-10 bg-white rounded-md border border-[#E5E7EB]' >
                        <input onChange={(event: any) => {
                            setFromDate(event.target.value)
                        }} type="date" placeholder='Select Date' className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' />
                    </div>
                </div>

                <div className='space-y-1 w-[20%]' >
                    <p className='text-[#111827] font-medium text-sm' >To</p>

                    <div className='flex items-center px-2 h-10 bg-white rounded-md border border-[#E5E7EB] w-full' >
                        <input onChange={(event: any) => {
                            setToDate(event.target.value)
                        }} type="date" placeholder='Select Date' className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' />
                    </div>
                </div>

                <button className='bg-[#A5B4FC] h-10 text-[#E0E7FF] border border-[#818CF8] rounded-md p-1 px-5' >Search</button>
            </div>

            {/* Table */}
            <div className='p-4 border mt-8 bg-white border-[#D9D9D9] rounded-lg'>
                <table className="w-full mt-4 table-auto text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2  ps-4 text-sm font-medium text-gray-700">Date & Time</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Business</th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Category
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Details
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Offer Expiry Date
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            redemptionData?.length > 0 && (
                                <>
                                    {redemptionData.map((deal: any, index) => (
                                        <tr
                                            key={index}
                                            className="border-b"
                                        >
                                            <td className="p-4 flex items-center space-x-4">

                                                <p className="text-sm font-medium text-[#111827]">
                                                    {moment.utc(deal.createdAt).format("MMM DD, YYYY, HH:MM A")}
                                                </p>
                                            </td>
                                            <td className="p-4 text-sm text-[#111827]">{deal.business_name}</td>
                                            <td className="p-4 text-sm text-[#111827]">{deal?.deal?.category}</td>
                                            <td className="p-4 text-sm text-[#111827]">{deal?.deal?.name}</td>
                                            <td className="p-4 text-sm text-[#111827]">{moment.utc(deal?.deal?.expiration).format("MMM DD, YYYY, HH:MM A")}</td>
                                            <td className="p-4 text-sm text-[#111827]">{deal.status}</td>
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

export default RedemptionHistory