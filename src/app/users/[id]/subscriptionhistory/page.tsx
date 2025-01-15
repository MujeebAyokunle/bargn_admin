import Nav from '@/components/Nav'
import { ExportIcon } from '@/components/Svgs/icons'
import moment from 'moment'
import React from 'react'

function Subscriptionhistory() {

    const methods = [
        {
            name: "Gees Chaikh",
            type: "VISA",
            status: "active"
        },
        {
            name: "Gees Chaikh",
            type: "VISA",
            status: "inactive"
        },
        {
            name: "Gees Chaikh",
            type: "MasterCard",
            status: "expired"
        },
    ]

    return (
        <Nav >
            <div className='flex items-center my-8 justify-between' >
                <p className='text-[#0A0909] font-bold text-[20px]' >Subscription History</p>

                <div className='flex cursor-pointer p-1 px-2 items-center bg-[#6366F1] border border-[#6366F1] shadow-md rounded-md' >
                    <ExportIcon />
                    <p className='text-white font-normal text-[15px]' >Export CSV</p>
                </div>
            </div>

            {/* subscription history table */}
            <table className="mt-16 table-auto bg-white rounded w-[75%] text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-sm font-medium text-gray-700">Payment Details</th>
                        <th className="p-2 text-sm font-medium text-gray-700">Subscription Plan</th>
                        <th className="p-2 text-sm font-medium text-gray-700">Amount</th>
                        <th className="p-2 ps-6 text-sm font-medium text-gray-700">Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        methods?.length > 0 && (
                            <>
                                {methods.map((user: any, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50 transition cursor-pointer duration-150"
                                    >
                                        <td className="p-4 flex items-center space-x-4">

                                            <img src={user?.profile_pic} className="bg-blue-200 rounded-lg" style={{ borderRadius: 20, height: 40, width: 40 }} />
                                            <span className="text-sm font-medium text-[#111827]">
                                                {user.name}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#111827]">Yearly</td>
                                        <td className="p-4 text-sm text-[#111827]"> €1,200</td>
                                        <td className="p-4 text-sm text-[#111827]">{moment().format("MMM DD, YYYY, h:mm a")}</td>
                                    </tr>
                                ))}
                            </>
                        )
                    }
                </tbody>
            </table>
        </Nav>
    )
}

export default Subscriptionhistory