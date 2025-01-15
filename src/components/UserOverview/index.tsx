import { toTitleCase } from '@/helper/functions'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { IoMdCheckmark } from 'react-icons/io'

function UserOverview({ userDetails }: { userDetails: any }) {

    const router = useRouter()

    return (
        <div className='flex items-start space-x-4' >
            {/* First column (avatar section) */}
            <div className='space-y-6 w-[33%]' >
                {/* Avatar photo */}
                <div className='border space-y-6 rounded w-full border-black p-3' >
                    <p className='text-black text-sm font-semibold' >Avatar Photo</p>
                    <div className='flex justify-center items-center' >
                        {
                            userDetails?.profile_picture ? (
                                <img src={userDetails?.profile_picture} alt="profile" style={{ width: 170, height: 170, borderRadius: 85 }} />
                            ) : (
                                <div style={{ width: 170, height: 170, borderRadius: 85 }} className='bg-[#6B7280] flex items-center justify-center' >
                                    <p className='text-black text-[57px] font-semibold' >{userDetails?.full_name?.[0]?.toUpperCase()}</p>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className='border w-full rounded border-black p-3' >
                    <p className='text-black text-sm font-semibold' >Contact Details</p>

                    {/* email */}
                    <div className='mt-4'>
                        <p className='text-[#B3B3B3] font-normal text-[12px]' >Email address</p>
                        <div className='border border-[#b3b3b3] rounded p-1 mt-1 overflow-hidden' >
                            <p className='text-[#b3b3b3] font-normal text-base' >{userDetails?.email}</p>
                        </div>
                    </div>

                    <div className='space-y-4 mt-4' >
                        <div className='flex items-center space-x-2' >

                            {
                                userDetails?.status == "active" || userDetails?.status == "deactivated" ? (
                                    <div className='bg-[#b3b3b3] rounded p-[1px] flex justify-center items-center' >
                                        <IoMdCheckmark color='white' size={18} />
                                    </div>
                                ) : (
                                    <div className='border border-[#b3b3b3] rounded w-[20px] h-[20px] flex justify-center items-center' >
                                        <p>&nbsp;</p>
                                    </div>
                                )
                            }



                            <p className='text-[#B3B3B3] text-sm font-normal' >Email address verified</p>
                        </div>

                        <div className='flex items-center space-x-2' >

                            {
                                userDetails?.email_digest_account_updates || userDetails?.email_digest_account_updates == null ? (
                                    <div className='bg-[#b3b3b3] rounded p-[1px] flex justify-center items-center' >
                                        <IoMdCheckmark color='white' size={18} />
                                    </div>
                                ) : (
                                    <div className='border border-[#b3b3b3] rounded w-[20px] h-[20px] flex justify-center items-center' >
                                        <p>&nbsp;</p>
                                    </div>
                                )
                            }

                            <p className='text-[#B3B3B3] text-sm font-normal' >Allows email updates</p>
                        </div>
                    </div>

                    {/* Phone number */}
                    <div className='mt-4'>
                        <p className='text-[#B3B3B3] font-normal text-[12px]' >Phone Number</p>
                        <div className='border border-[#b3b3b3] rounded p-1 mt-1' >
                            <p className='text-[#b3b3b3] font-normal text-base' >{userDetails?.phone_number}</p>
                        </div>
                    </div>

                    <div className='flex mt-4 items-center space-x-2' >

                        {
                            userDetails?.status == "active" || userDetails?.status == "deactivated" ? (
                                <div className='bg-[#b3b3b3] rounded p-[1px] flex justify-center items-center' >
                                    <IoMdCheckmark color='white' size={18} />
                                </div>
                            ) : (
                                <div className='border border-[#b3b3b3] rounded w-[20px] h-[20px] flex justify-center items-center' >
                                    <p>&nbsp;</p>
                                </div>
                            )
                        }

                        <p className='text-[#B3B3B3] text-sm font-normal' >Phone number verified</p>
                    </div>
                </div>
            </div>

            {/* Middle column */}
            <div className='border w-[40%] rounded border-black p-3' >
                <p className='text-black text-sm font-semibold' >User Personal Data</p>

                <div className='space-y-4' >
                    <div >
                        <p className='text-[#B3B3B3] font-normal text-[12px]' >Id</p>
                        <div className='border border-[#b3b3b3] rounded p-1 mt-1' >
                            <p className='text-[#b3b3b3] font-normal text-base' >{userDetails?.id}</p>
                        </div>
                    </div>
                    {/* full name */}
                    <div>
                        <p className='text-[#B3B3B3] font-normal text-[12px]' >Full Name</p>
                        <div className='border border-[#b3b3b3] rounded p-1 mt-1' >
                            <p className='text-[#b3b3b3] font-normal text-base' >{userDetails?.full_name}</p>
                        </div>
                    </div>

                    {/* DOB */}
                    <div>
                        <p className='text-[#B3B3B3] font-normal text-[12px]' >Date of Birth</p>
                        <div className='border border-[#b3b3b3] rounded p-1 mt-1' >
                            <p className='text-[#b3b3b3] font-normal text-base' >{moment(userDetails?.birthday).local().format("DD/MM/Y")}</p>
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <p className='text-[#B3B3B3] font-normal text-[12px]' >Gender</p>
                        <div className='border border-[#b3b3b3] rounded p-1 mt-1' >
                            <p className='text-[#b3b3b3] font-normal text-base' >{userDetails?.gender ? toTitleCase(userDetails?.gender) : "Not set"}</p>
                        </div>
                    </div>

                    {/* Language */}
                    <div>
                        <p className='text-[#B3B3B3] font-normal text-[12px]' >Language</p>
                        <div className='border border-[#b3b3b3] rounded p-1 mt-1' >
                            <p className='text-[#b3b3b3] font-normal text-base' > {userDetails?.language || "English"}</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <p className='text-[#B3B3B3] font-normal text-[12px]' >Locaion</p>
                        <div className='border min-h-12 border-[#b3b3b3] rounded p-1 mt-1' >
                            <p className='text-[#b3b3b3] font-normal text-base' >{userDetails?.location || ""} </p>
                        </div>
                    </div>

                    <p className='text-[#b3b3b3] font-normal text-sm' >  </p>
                    <p className='text-[#b3b3b3] font-normal text-sm' >{userDetails?.time_zone ? Array.isArray(userDetails?.time_zone) ? userDetails?.time_zone?.[0] : userDetails?.time_zone : ""}  </p>

                </div>
            </div>

            {/* Right column */}
            <div className='w-[26%] space-y-6' >
                {/* Payment and subscription */}
                <div className='border rounded w-full border-black p-3' >
                    <p className='text-black text-sm font-semibold' >Payment & Subscription</p>

                    <div className='space-y-3 mt-4' >
                        <p className='text-[#B3B3B3] font-normal text-sm' >Subcription Plan: {toTitleCase(userDetails?.subscription_plan)}</p>
                        <p className='text-[#B3B3B3] font-normal text-sm' >Start Date: {moment(userDetails?.createdAt).local().format("DD/MM/Y")} </p>
                        <p className='text-[#B3B3B3] font-normal text-sm' >Renewal Date: 12/11/2024 </p>
                    </div>
                </div>

                {/* links section */}
                <div className='border rounded w-full border-black p-3' >
                    <p className='text-black text-sm font-semibold' >Links</p>

                    <div className='mt-4 space-y-3' >
                        <div onClick={() => router.push("/users/2/subscriptionhistory")} className='flex items-center space-x-3 cursor-pointer' >
                            <p className='text-[#6366F1] font-normal text-sm' >Subscription History</p>

                            <FiArrowUpRight color='#6366F1' size={14} />
                        </div>
                        <div onClick={() => router.push("/users/2/userpaymentmethods")} className='flex items-center space-x-3 cursor-pointer' >
                            <p className='text-[#6366F1] font-normal text-sm' >Payment methods</p>

                            <FiArrowUpRight color='#6366F1' size={14} />
                        </div>
                    </div>
                </div>

                <div className='border rounded w-full border-black p-3' >
                    <p className='text-black text-sm font-semibold' >Fraud</p>

                    <div className='flex mt-4 items-center space-x-2' >
                        {
                            false ? (
                                <div className='bg-[#b3b3b3] rounded p-[1px] flex justify-center items-center' >
                                    <IoMdCheckmark color='white' size={18} />
                                </div>
                            ) : (
                                <div className='border border-[#b3b3b3] rounded w-[20px] h-[20px] flex justify-center items-center' >
                                    <p>&nbsp;</p>
                                </div>
                            )
                        }
                        <p className='text-[#B3B3B3] text-sm font-normal' >Is bot</p>
                    </div>

                    <div className='flex mt-4 items-center space-x-2' >
                        {
                            userDetails?.status == "blocked" ? (
                                <div className='bg-[#b3b3b3] rounded p-[1px] flex justify-center items-center' >
                                    <IoMdCheckmark color='white' size={18} />
                                </div>
                            ) : (
                                <div className='border border-[#b3b3b3] rounded w-[20px] h-[20px] flex justify-center items-center' >
                                    <p>&nbsp;</p>
                                </div>
                            )
                        }
                        <p className='text-[#B3B3B3] text-sm font-normal' >Is blocked</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserOverview