import { fetchBusinessesRedeemedDealsApi } from '@/apis'
import { getPages } from '@/helper/functions'
import moment from 'moment'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function DealRedemption() {

    const { id }: any = useParams()

    const [pageNumber, setPageNumber] = useState(1)

    const [totalPages, setTotalPages] = useState<number>(1)
    const [fromDate, setFromDate] = useState<any>()
    const [toDate, setToDate] = useState<any>()
    const [redeemedDeals, setRedeemedDeals] = useState<any>([])

    const onPageChange = (page: number) => {
        setPageNumber(page)
    }

    useEffect(() => {
        initialize()
    }, [pageNumber, fromDate, toDate])

    const initialize = async () => {
        let json = {
            business_id: id,
            from_date: fromDate,
            to_date: toDate,
            pageNumber
        }

        fetchBusinessesRedeemedDealsApi(json, response => {

            if (!response?.error) {
                setTotalPages(response?.totalPages)
                setRedeemedDeals(response?.myDeals)
            }
        })
    }

    return (
        <div>
            {/* FIlter section */}
            <div className='mt-4 space-x-5 flex items-end' >

                <div className='space-y-1 w-[20%]' >
                    <p className='text-[#111827] font-medium text-sm' >From</p>

                    <div className='flex items-center space-x-1 w-full px-2 h-10 bg-white rounded-md border border-[#E5E7EB]' >
                        <input type="date" placeholder='Select Date' className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' onChange={(event) => setFromDate(event.target.value)} />
                    </div>
                </div>

                <div className='space-y-1 w-[20%]' >
                    <p className='text-[#111827] font-medium text-sm' >To</p>

                    <div className='flex items-center px-2 h-10 bg-white rounded-md border border-[#E5E7EB] w-full' >
                        <input type="date" placeholder='Select Date' className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' onChange={(event) => setToDate(event.target.value)} />
                    </div>
                </div>

            </div>

            {/* Table */}
            <div className='p-4 border mt-8 bg-white border-[#D9D9D9] rounded-lg'>
                <table className="w-full mt-4 table-auto text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2  ps-4 text-sm font-medium text-gray-700">Date & Time</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Redeemed by</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Email</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Deal redeemed</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Offer Expiry Date</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            redeemedDeals?.map((offer: any, index: number) => (
                                <tr key={index}>
                                    <td className="p-2 text-center text-black text-sm border-b">{moment.utc(offer?.createdAt).format("D MMM, Y")}</td>
                                    <td className="p-2 text-black text-sm border-b">{offer?.user?.full_name}</td>
                                    <td className="p-2 text-center text-black text-sm border-b">{offer?.user?.email}</td>
                                    <td className="p-2 text-center text-black text-sm border-b">{offer?.deal?.name}</td>
                                    <td className="p-2 text-center text-black text-sm border-b">{moment.utc(offer?.expiration).format("D MMM, Y")}</td>
                                    <td className="p-2 text-black text-sm border-b">{offer.status}</td>
                                </tr>
                            ))
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

export default DealRedemption