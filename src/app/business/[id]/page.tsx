"use client"
import { fetchBusinessesDetailsApi, flagBusinessApi } from '@/apis'
import ActivityLoader from '@/components/ActivityLoader'
import BusinessActivityLog from '@/components/BusinessActivityLog'
import BusinessOverview from '@/components/BusinessOverview'
import DealRedemption from '@/components/DealRedemption'
import Nav from '@/components/Nav'
import { FlagIcon } from '@/components/Svgs/icons'
import { errorToast, successToast } from '@/helper/functions'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function BusinessDetails() {

    const { id }: any = useParams()

    const [activeTab, setActiveTab] = useState("business overview")
    const [loading, setLoading] = useState(false)

    const [redemptions, setRedemptions] = useState<any>(0)
    const [thisWeekDealsNo, setThisWeekDealsNo] = useState<number>(0)
    const [listedDeals, setListedDeals] = useState<number>(0)

    const [businessDetails, setBusinessDetails] = useState<any>({})
    const [businessOffers, setBusinessOffers] = useState<any>([])
    const [thisWeekDeals, setThisWeekDeals] = useState<Array<number>>([0, 0, 0, 0, 0, 0, 0])
    const [lastWeekDeals, setLastWeekDeals] = useState<Array<number>>([0, 0, 0, 0, 0, 0, 0])
    const [monthlyRevenue, setMonthlyRevenue] = useState<any>({ "jan": 0, "feb": 0, "mar": 0, "apr": 0, "may": 0, "jun": 0, "jul": 0, "aug": 0, "sep": 0, "oct": 0, "nov": 0, "dec": 0 })

    useEffect(() => {

        initialize()
    }, [])

    const initialize = async () => {
        fetchBusinessesDetailsApi({ business_id: id }, (response: any) => {

            if (!response?.error) {
                setBusinessDetails(response?.business)
                setBusinessOffers(response?.business_offers)
                setRedemptions(response?.redemptions)
                setThisWeekDealsNo(response?.thisWeekDealsNo)
                setListedDeals(response?.listedDeals)
                setMonthlyRevenue(response?.monthlyRevenue)
                setThisWeekDeals(response?.thisWeekdDealsPerDay)
                setLastWeekDeals(response?.lastWeekdDealsPerDay)
            }
        })
    }

    const flagBusiness = (status: string) => {
        setLoading(true)
        let body = {
            business_id: businessDetails?.business_id || "",
            status
        }
        flagBusinessApi(body, response => {
            setLoading(false)

            if (!response?.error) {
                successToast(response?.message)
                setBusinessDetails(() => {
                    const updatedDetails = { ...businessDetails }
                    updatedDetails.status = status
                    return updatedDetails
                })
            } else {
                errorToast(response?.message)
            }
        })
    }

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
                    <button onClick={() => flagBusiness(businessDetails?.status == "blocked" ? "approved" : "blocked")} className='bg-[#EF4444] border border-[#DC2626] rounded-md py-1 px-3 text-white font-medium text-base flex items-center justify-center space-x-1' >
                        <FlagIcon />
                        {
                            loading ? <ActivityLoader /> : businessDetails?.status == "blocked" ? "Unflag Account" : "Flag Account"
                        }
                    </button>
                </div>

                {
                    activeTab == "business overview" ? (
                        <BusinessOverview thisWeekDeals={thisWeekDeals} lastWeekDeals={lastWeekDeals} businessOffers={businessOffers} listedDeals={listedDeals} businessDetails={businessDetails} redemptions={redemptions} monthlyRevenue={monthlyRevenue} />
                    ) : activeTab == "deal redemption" ? (
                        <DealRedemption />
                    ) : (
                        <BusinessActivityLog email={businessDetails?.email || ""} />
                    )
                }

            </div>
        </Nav>
    )
}

export default BusinessDetails