import Nav from '@/components/Nav'
import { ExportIcon } from '@/components/Svgs/icons'
import React from 'react'

function Userpaymentmethods() {

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
        <Nav>
            <div className='flex items-center my-8 justify-between' >
                <p className='text-[#0A0909] font-bold text-[20px]' >User Payment Methods</p>

                <div className='flex cursor-pointer p-1 px-2 items-center bg-[#6366F1] border border-[#6366F1] shadow-md rounded-md' >
                    <ExportIcon />
                    <p className='text-white font-normal text-[15px]' >Export CSV</p>
                </div>
            </div>

            {/* payment methods table */}
            <table className="mt-16 table-auto bg-white rounded w-[75%] text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="p-2 ps-6 text-sm font-medium text-gray-700">Name on Card</th>
                        <th className="p-2 text-sm font-medium text-gray-700">Type</th>
                        <th className="p-2 text-sm font-medium text-gray-700">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        methods?.length > 0 && (
                            <>
                                {methods.map((user: any, index) => (
                                    <tr
                                        key={index}
                                        className="border-b"
                                    >
                                        <td className="p-4 flex items-center space-x-4">
                                            <span className="text-sm font-medium text-[#111827]">
                                                {user.name}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="p-4 flex items-center space-x-1" >
                                                <img src={user?.profile_pic} className="bg-blue-200 rounded-md" style={{ height: 32, width: 32 }} />
                                                <p className='text-[#111827] text-sm' >
                                                    {user.type}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-[#111827]">{user.status}</td>
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

export default Userpaymentmethods