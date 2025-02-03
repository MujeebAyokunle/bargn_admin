"use client"
import Nav from '@/components/Nav';
import { errorToast, getPages } from '@/helper/functions';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { ColorSchema } from '@/helper/colorScheme';
import { ExportDealsApi, fetchDealDraftApi, fetchDealsApi } from '@/apis';
import { ExportIcon } from '@/components/Svgs/icons';

function Deals() {

    const router = useRouter()

    const [activeTab, setActiveTab] = useState("all")
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [deals, setDeals] = useState([])

    const statusClasses: any = {
        active: "bg-green-100 text-green-700",
        archive: "bg-red-100 text-red-700",
        processing: "bg-blue-100 text-blue-700",
        draft: "bg-gray-100 text-gray-700",
    };

    // Get initial deals payload
    useEffect(() => {
        const cookie = Cookies.get("token")
        if (!cookie) {
            router.push("/")
            return
        }

        initialize()
    }, [activeTab, pageNumber])

    const initialize = () => {

        let json = {
            page_number: pageNumber,
            status: activeTab?.toLowerCase() == "all" ? "" : activeTab?.toLowerCase() == "deactivated" ? "archive" : activeTab?.toLowerCase()
        }
        fetchDealsApi(json, response => {

            if (!response?.error) {
                setTotalPages(response?.totalPages)
                setDeals(response?.deals)
            } else {
                errorToast(response?.message)
            }
        })
    }

    const exportDeals = async () => {
        let json = {
            page_number: pageNumber,
            status: activeTab?.toLowerCase() == "all" ? "" : activeTab?.toLowerCase() == "deactivated" ? "archive" : activeTab?.toLowerCase()
        }

        ExportDealsApi(json, response => {
            if (response?.error) {
                errorToast(response.message);
            }
        })
    }

    const onPageChange = (page: number) => setPageNumber(page)

    return (
        <Nav>
            <div className="p-4 bg-gray-100 min-h-screen">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl text-[#0A0909] font-bold">Deals</h1>

                    <div onClick={exportDeals} className='flex cursor-pointer p-1 px-2 items-center bg-[#6366F1] border border-[#6366F1] shadow-md rounded-md' >
                        <ExportIcon />
                        <p className='text-white font-normal text-[15px]' >Export CSV</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b mb-6">
                    {["All", "Active", "Deactivated"].map((tab, index) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 border ${index == 0 && "rounded-tl-md rounded-bl-md"} ${index == 3 && "rounded-tr-md rounded-br-md"} ${activeTab.toLowerCase() === tab.toLowerCase() ? "bg-[#F3F4F6]" : "bg-white"}`}
                            style={{ borderColor: "rgba(0,0,0,0.2)" }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full table-auto text-left border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 ps-6 text-sm font-medium text-gray-700">Deals ID</th>
                                <th className="p-2 ps-6 text-sm font-medium text-gray-700">Listed Deals</th>
                                <th className="p-2 text-sm font-medium text-gray-700">Business Name</th>
                                <th className="p-2 text-sm font-medium text-gray-700">Price</th>
                                <th className="p-2 text-sm font-medium text-gray-700">
                                    Offers Available
                                </th>
                                <th className="p-2 text-sm font-medium text-gray-700">
                                    Offer Expiry Date
                                </th>
                                <th className="p-2 text-sm font-medium text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                deals?.length > 0 && (
                                    <>
                                        {deals.map((deal: any, index) => (
                                            <tr
                                                key={index}
                                                className="border-b hover:bg-gray-50 transition duration-150"
                                            >
                                                <td className="p-4 text-sm text-center text-gray-700">{deal?.id}</td>
                                                <td className="p-4 flex items-center space-x-4">
                                                    {
                                                        activeTab?.toLowerCase() !== "draft" && (
                                                            <img src={deal?.image} className="w-12 h-12 bg-blue-200 rounded-lg" />
                                                        )}
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {deal.name}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-gray-700">{deal?.business?.business_name}</td>
                                                <td className="p-4 text-sm text-gray-700">€ {deal.price}</td>
                                                <td className="p-4 text-sm text-gray-700">{deal.number_available}</td>
                                                <td className="p-4 text-sm text-gray-700">{deal.expiration ? moment.utc(deal.expiration).format('D MMMM YYYY') : ""}</td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-3 py-1 text-sm rounded-full ${statusClasses[new Date(deal.expiration) >= new Date() ? "active" : "archive"]}`}
                                                    >
                                                        {new Date(deal.expiration) >= new Date() ? "active" : "archive"}
                                                    </span>
                                                </td>
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
        </Nav >
    )
}

export default Deals