"use client"
import ActivityLoader from '@/components/ActivityLoader'
import BusinessActivityLog from '@/components/BusinessActivityLog'
import BusinessOverview from '@/components/BusinessOverview'
import DealRedemption from '@/components/DealRedemption'
import Nav from '@/components/Nav'
import { FlagIcon } from '@/components/Svgs/icons'
import React, { useState } from 'react'

function BusinessDetails() {

    const [activeTab, setActiveTab] = useState("business overview")
    const [loading, setLoading] = useState(false)

    const [userDetails, setUserDetails] = useState<any>({})

    return (
        <Nav >
            <div className='px-4' >
                {/* tabs */}
                <div className='flex items-center mt-4 justify-between' >
                    <div className='flex items-center' >
                        <button onClick={() => setActiveTab("business overview")} className={`text-[#374151] border border-[#E5E7EB] font-medium text-base ${activeTab == "business overview" ? "bg-[#F3F4F6]" : "bg-white"} rounded-tl-md rounded-bl-md py-1 px-3`} >Business Overview</button>

                        <button onClick={() => setActiveTab("deal redemption")} className={`text-[#374151] border border-[#E5E7EB] font-medium text-base  ${activeTab == "deal redemption" ? "bg-[#F3F4F6]" : "bg-white"} py-1 px-3`}>Deal Redemptions</button>
                        <button onClick={() => setActiveTab("activity log")} className={`text-[#374151] border border-[#E5E7EB] font-medium text-base  ${activeTab == "activity log" ? "bg-[#F3F4F6]" : "bg-white"} py-1 px-3 rounded-tr-md rounded-br-md`}>Activity Log</button>
                    </div>

                    {/* flag account */}
                    <button className='bg-[#EF4444] border border-[#DC2626] rounded-md py-1 px-3 text-white font-medium text-base flex items-center justify-center space-x-1' >
                        <FlagIcon />
                        {
                            loading ? <ActivityLoader /> : userDetails?.status == "blocked" ? "Unflag Account" : "Flag Account"
                        }
                    </button>
                </div>

                {
                    activeTab == "business overview" ? (
                        <BusinessOverview />
                    ) : activeTab == "deal redemption" ? (
                        <DealRedemption />
                    ) : (
                        <BusinessActivityLog />
                    )
                }

            </div>
        </Nav>
    )
}

export default BusinessDetails