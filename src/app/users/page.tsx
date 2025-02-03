"use client"
import { ExportUsersApi, fetchUsersApi } from '@/apis'
import Nav from '@/components/Nav'
import { ExportIcon } from '@/components/Svgs/icons'
import { errorToast, getPages } from '@/helper/functions'
import { stat } from 'fs'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { IoIosSearch } from 'react-icons/io'
import { IoEllipsisVertical } from 'react-icons/io5'
import { LuCalendarDays } from 'react-icons/lu'

const statusClasses: any = {
    active: "bg-green-100 text-green-700",
    archived: "bg-red-100 text-red-700",
    processing: "bg-blue-100 text-blue-700",
    drafts: "bg-gray-100 text-gray-700",
};

function Users() {

    const router = useRouter()

    const [activeTab, setActiveTab] = useState("all users")
    const [searchText, setSearchText] = useState("")
    const [registrationDate, setRegistrationDate] = useState<any>(null)
    const [subscriptionDate, setSubscriptionDate] = useState<any>(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [users, setUsers] = useState([])

    useEffect(() => {
        init()
    }, [pageNumber, searchText, activeTab, registrationDate, subscriptionDate])

    const init = async () => {
        let json = {
            pageNumber,
            search_text: searchText,
            registration_date: registrationDate,
            subscription_date: subscriptionDate,
            status: activeTab?.toLowerCase() == "all users" ? "" : activeTab?.toLowerCase() == "inactive" ? "pending" : activeTab?.toLowerCase() == "deactivate" ? "deactivated" : activeTab.toLowerCase()
        }

        fetchUsersApi(json, (response) => {

            if (!response?.error) {
                setUsers(response?.users)
                setTotalPages(response?.totalPages)
            }
        })
    }

    const onPageChange = (page: number) => {
        setPageNumber(page)
    }

    const exportUsers = async () => {
        let json = {
            search_text: searchText,
            registration_date: registrationDate,
            subscription_date: subscriptionDate,
            status: activeTab?.toLowerCase() == "all users" ? "" : activeTab?.toLowerCase() == "inactive" ? "pending" : activeTab?.toLowerCase() == "deactivate" ? "deactivated" : activeTab.toLowerCase()
        }

        ExportUsersApi(json, response => {
            if (response?.error) {
                errorToast(response.message);
            }
        })
    }

    return (
        <Nav>
            {/* FIlter section */}
            <div className='mt-4 space-x-5 flex items-end' >
                <div className='space-y-1' >
                    <p className='text-[#111827] font-medium text-sm' >Search</p>

                    <div className='flex items-center space-x-1 w-52 p-1 h-8 bg-white rounded-md border border-[#E5E7EB]' >
                        <IoIosSearch color='#6B7280' size={20} />
                        <input onChange={(evt) => setSearchText(evt.target.value)} type="text" className='focus:outline-none text-sm text-[#6B7280] bg-transparent' />
                    </div>
                </div>

                <div className='space-y-1' >
                    <p className='text-[#111827] font-medium text-sm' >Registration Date</p>

                    <div className='flex items-center space-x-1 w-40 px-2 h-8 bg-white rounded-md border border-[#E5E7EB]' >
                        <input onChange={(evt) => setRegistrationDate(evt.target.value)} type="date" placeholder='Select Date' className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' />
                    </div>
                </div>

                <div className='space-y-1' >
                    <p className='text-[#111827] font-medium text-sm' >Subscription Date</p>

                    <div className='flex items-center px-2 h-8 bg-white rounded-md border border-[#E5E7EB] w-40' >
                        <input onChange={(evt) => setSubscriptionDate(evt.target.value)} type="date" placeholder='Select Date' className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' />
                    </div>
                </div>

                <div className='space-y-1' >
                    <p className='text-[#111827] font-medium text-sm' >Status</p>

                    <select className='flex text-[#6B7280] text-sm w-32 items-center px-2 h-8 bg-white rounded-md border border-[#E5E7EB]' >
                        <option value="all">All</option>
                        <option value="redeemed">Redeemed</option>
                        <option value="progress">Progress</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

            </div>

            {/* All users header */}
            <div className='flex items-center my-8 justify-between' >
                <p className='text-[#0A0909] font-bold text-[20px]' >All Users</p>

                <div onClick={exportUsers} className='flex cursor-pointer p-1 px-2 items-center bg-[#6366F1] border border-[#6366F1] shadow-md rounded-md' >
                    <ExportIcon />
                    <p className='text-white font-normal text-[15px]' >Export CSV</p>
                </div>
            </div>

            {/* table */}
            <div className='p-4 border mt-8 bg-white border-[#D9D9D9] rounded-lg'>
                <div className='py-2 border-b flex items-center w-full justify-between' >
                    <div>
                        {["All Users", "Active", "Inactive", "Deactivate"].map((tab, index) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 border ${index == 0 && "rounded-tl-md rounded-bl-md"} ${index == 3 && "rounded-tr-md rounded-br-md"} ${activeTab.toLowerCase() === tab.toLowerCase() ? "bg-[#F3F4F6]" : "bg-white"}`}
                                style={{ borderColor: "rgba(0,0,0,0.2)" }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <IoEllipsisVertical className='cursor-pointer' color='#374151' size={17} />
                </div>

                {/* table */}
                <table className="w-full mt-4 table-auto text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 ps-6 text-sm font-medium text-gray-700">Name</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Email</th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Phone Number
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Status
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Registration Date
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">Last Redemption</th>
                            <th className="p-2 text-sm font-medium text-gray-700">App Version</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.length > 0 && (
                                <>
                                    {users.map((user: any, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => { router.push(`/users/${user?.id}`) }}
                                            className="border-b hover:bg-gray-50 transition cursor-pointer duration-150"
                                        >
                                            <td className="p-4 flex items-center space-x-4">

                                                <img src={user?.profile_picture || "https://via.placeholder.com/150"} className="bg-blue-200" style={{ borderRadius: 20, height: 40, width: 40, objectFit: "cover" }} />
                                                <span className="text-sm font-medium text-[#111827]">
                                                    {user.full_name}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-[#111827]">{user.email}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user.phone_number}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user.status}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user.createdAt ? moment(user.createdAt).local().format('D MMMM YYYY') : ""}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user?.mydeals?.[0]?.createdAt ? moment(user?.mydeals?.[0]?.createdAt).local().format('D MMMM YYYY') : "None"}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user.app_version}</td>
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

        </Nav >
    )
}

export default Users