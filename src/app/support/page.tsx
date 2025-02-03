"use client"
import { fetchChatsApi } from '@/apis'
import Nav from '@/components/Nav'
import { getPages } from '@/helper/functions'
import { setChatUser } from '@/lib/features/chatUser'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { IoIosSearch } from 'react-icons/io'
import { IoEllipsisVertical } from 'react-icons/io5'
import { useDispatch } from 'react-redux'

function HelpNSupport() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [searchText, setSearchText] = useState("")
    const [registrationDate, setRegistrationDate] = useState<any>(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [users, setUsers] = useState([])

    useEffect(() => {
        initialize()
    }, [pageNumber])

    const onPageChange = (page: number) => {
        setPageNumber(page)
    }

    const initialize = () => {
        let json = {
            page_number: pageNumber
        }

        fetchChatsApi(json, response => {
            
            if (!response?.error) {
                setTotalPages(response?.totalPages)
                setUsers(response?.uniqueChats)
            }
        })
    }

    return (
        <Nav>
            {/* All users header */}
            <div className='flex items-center my-8 justify-between' >
                <p className='text-[#0A0909] font-bold text-[20px]' >Support Center</p>
            </div>

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
                    <p className='text-[#111827] font-medium text-sm' >Date Added</p>

                    <div className='flex items-center space-x-1 w-40 px-2 h-8 bg-white rounded-md border border-[#E5E7EB]' >
                        <input onChange={(evt) => setRegistrationDate(evt.target.value)} type="date" placeholder='Select Date' className='focus:outline-none w-full bg-transparent text-[#6B7280] text-sm' />
                    </div>
                </div>

                <div className='space-y-1' >
                    <p className='text-[#111827] font-medium text-sm' >Client type</p>

                    <select className='flex text-[#6B7280] text-sm w-32 items-center px-2 h-8 bg-white rounded-md border border-[#E5E7EB]' >
                        <option value="all">All</option>
                        <option value="redeemed">Redeemed</option>
                        <option value="progress">Progress</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className='space-y-1' >
                    <p className='text-[#111827] font-medium text-sm' >Ticket type</p>

                    <select className='flex text-[#6B7280] text-sm w-32 items-center px-2 h-8 bg-white rounded-md border border-[#E5E7EB]' >
                        <option value="all">All</option>
                        <option value="redeemed">Redeemed</option>
                        <option value="progress">Progress</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

            </div>

            {/* table */}
            <div className='p-4 border mt-8 bg-white border-[#D9D9D9] rounded-lg'>

                {/* table */}
                <table className="w-full mt-4 table-auto text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 ps-6 text-sm font-medium text-gray-700">Ticket ID</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Subject</th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Client
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Ticket Type
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {users.map((user: any, index) => (
                                <tr
                                    key={index}
                                    onClick={() => {
                                        dispatch(setChatUser(user))
                                        router.push(`/support/${user?.id}`)
                                    }}
                                    className="border-b hover:bg-gray-50 transition cursor-pointer duration-150"
                                >
                                    <td className="p-4 text-sm text-[#111827]">#{user?.id}</td>
                                    <td className="p-4 text-sm text-[#111827]">Customer support</td>
                                    <td className="p-4 flex items-center space-x-4">

                                        <img src={user?.user?.profile_picture || "https://via.placeholder.com/150"} className="bg-blue-200" style={{ borderRadius: 20, height: 40, width: 40, objectFit: "cover" }} />
                                        <span className="text-sm font-medium text-[#111827]">
                                            {user?.user.full_name || user?.user?.business_name}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-[#111827]">Support</td>
                                    <td className="p-4 text-sm text-[#111827]">{user.status}</td>
                                </tr>
                            ))}
                        </>
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
        </Nav>
    )
}

export default HelpNSupport