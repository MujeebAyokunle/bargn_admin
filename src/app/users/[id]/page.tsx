"use client"
import { fetchUserDeatailsApi, flagUserApi } from '@/apis'
import ActivityLoader from '@/components/ActivityLoader'
import Nav from '@/components/Nav'
import RedemptionHistory from '@/components/RedemptionHistory'
import { FlagIcon } from '@/components/Svgs/icons'
import UserActivityLog from '@/components/UserActivityLog'
import UserOverview from '@/components/UserOverview'
import { errorToast, successToast } from '@/helper/functions'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'

function UserDetails() {

    const { id }: any = useParams()

    const [activeTab, setActiveTab] = useState("user overview")
    const [loading, setLoading] = useState(false)

    const [userDetails, setUserDetails] = useState<any>({})

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        let json = {
            user_id: id
        }

        fetchUserDeatailsApi(json, response => {

            if (!response?.error) {
                setUserDetails(response?.user)
            }
        })
    }

    const flagAccount = (status: string) => {
        if (!id) {
            errorToast("User id not found")
            return
        }
        setLoading(true)
        let json = {
            user_id: parseInt(id),
            status
        }

        flagUserApi(json, (response) => {
            setLoading(false)

            if (!response?.error) {
                successToast(response?.message)

                setUserDetails({
                    ...userDetails,
                    status: status == "blocked" ? "blocked" : "active"
                })
            } else {
                errorToast(response?.message)
            }
        })
    }

    return (
        <Nav>
            <div className='px-4' >
                <div className='flex items-center mt-4 justify-between' >
                    <div className='flex items-center' >
                        <button onClick={() => setActiveTab("user overview")} className={`text-[#374151] border border-[#E5E7EB] font-medium text-base ${activeTab == "user overview" ? "bg-[#F3F4F6]" : "bg-white"} rounded-tl-md rounded-bl-md py-1 px-3`} >User Overview</button>
                        {/* <button onClick={() => setActiveTab("account history")} className={`text-[#374151] border border-[#E5E7EB] font-medium text-base  ${activeTab == "account history" ? "bg-[#F3F4F6]" : "bg-white"} py-1 px-3`}>Account Details History</button> */}
                        <button onClick={() => setActiveTab("redemption overview")} className={`text-[#374151] border border-[#E5E7EB] font-medium text-base  ${activeTab == "redemption overview" ? "bg-[#F3F4F6]" : "bg-white"} py-1 px-3`}>Redemption History</button>
                        <button onClick={() => setActiveTab("activity log")} className={`text-[#374151] border border-[#E5E7EB] font-medium text-base  ${activeTab == "activity log" ? "bg-[#F3F4F6]" : "bg-white"} py-1 px-3 rounded-tr-md rounded-br-md`}>Activity Log</button>
                    </div>

                    {/* flag account */}
                    <button onClick={() => flagAccount(userDetails?.status == "blocked" ? "active" : "blocked")} className='bg-[#EF4444] border border-[#DC2626] rounded-md py-1 px-3 text-white font-medium text-base flex items-center justify-center space-x-1' >
                        <FlagIcon />
                        {
                            loading ? <ActivityLoader /> : userDetails?.status == "blocked" ? "Unflag Account" : "Flag Account"
                        }
                    </button>
                </div>

                <div className='mt-10' >
                    {
                        activeTab == "user overview" ? (
                            <UserOverview userDetails={userDetails} />
                        ) : activeTab == "redemption overview" ? <RedemptionHistory id={id} /> : activeTab == "activity log" ? <UserActivityLog email={userDetails?.email} /> : ""
                    }
                </div>
            </div>
        </Nav>
    )
}

export default UserDetails