import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6'
import DoubleLineChart from '../DoubleLineChart'
import SingleLineChart from '../SingleLineChart'
import { StarIcon } from '../Svgs/icons'
import { SlOptionsVertical } from 'react-icons/sl'

function BusinessOverview() {
    return (
        <div>
            <div className='mt-12' >
                {/* left business name segment */}
                <div className='flex items-start space-x-4' >
                    <img src="/images/cover.jpeg" alt="profile" className='w-[79px] h-[82px] rounded-full' />
                    <div className='flex items-center justify-between w-full' >
                        <div>
                            <div className='flex items-center space-x-4' >
                                <p className='font-semibold text-[32px] text-[#404040]' >Hideout Villas</p>

                                <SlOptionsVertical color='black' size={16} />
                            </div>
                            <div>
                                <div className='flex items-center space-x-3 flex-wrap' >
                                    <div className='bg-[#0470AF26] px-[8px] py-[2px] rounded-full' >
                                        <p className='text-[#0470AF] font-medium text-[12px]' >Travel & hotels</p>
                                    </div>

                                    <div className='bg-[#AF048126] px-[8px] py-[2px] rounded-full'>
                                        <p className='text-[#AF0481] font-medium text-[12px]' >3 Locations</p>
                                    </div>

                                    <div className='bg-[#F0FDF4] px-[8px] py-[2px] rounded-full flex items-center space-x-1'>
                                        <div className='h-[6px] w-[6px] rounded-full bg-[#22C55E]' />
                                        <p className='text-[#22C55E] font-medium text-[12px]' >Approved</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center w-[40%] justify-between' >
                            {/* listed deals */}
                            <div className='flex items-center space-x-3' >
                                <div className='h-20 bg-[#d9d9d9] w-[7px] rounded-full relative' >
                                    <div className='bg-[#C16F6F] h-[14px] w-[14px] rounded-full absolute -left-[3px]' />
                                </div>
                                <div>
                                    <p className='text-[#1E1E1E] font-medium text-[15px]' >Listed Deals</p>
                                    <p className='font-medium text-[15px] text-[#757575]' >1/3</p>
                                </div>
                            </div>

                            {/* customer rating */}
                            <div className='flex items-center space-x-3' >
                                <div className='h-20 bg-[#d9d9d9] w-[7px] rounded-full relative' >
                                    <div className='bg-[#91C16F] h-[14px] w-[14px] rounded-full absolute -left-[3px]' />
                                </div>

                                <div>
                                    <p className='text-[#1E1E1E] font-medium text-[15px]' >Customer Rating </p>

                                    <div className='flex items-center space-x-1' >
                                        <p className='font-medium text-[15px] text-[#757575]' >4.8/5</p>

                                        <div className='flex items-center' >
                                            {
                                                [1, 2, 3, 4, 5].map((star, index) => <StarIcon key={index} />)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* redemption */}
                            <div className='flex items-center space-x-3' >
                                <div className='h-20 bg-[#d9d9d9] w-[7px] rounded-full relative' >
                                    <div className='bg-[#6FAAC1] h-[14px] w-[14px] rounded-full absolute -left-[3px]' />
                                </div>

                                <div>
                                    <p className='text-[#1E1E1E] font-medium text-[15px]' >Redemptions </p>
                                    <p className='font-medium text-[15px] text-[#757575]' >56</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business details */}
                <div className='flex items-start space-x-6 mt-12' >
                    <div className='w-1/2' >
                        <div>
                            <p className='text-[#7B809A] font-normal text-base' >Radisson Blu Seaside Hotel, Helsinki is located in a trendy area near the lively Länsisatama. The core center can be easily reached by tram or on foot. There are both comfortable Standard rooms and stylish suites to choose from. Guests can also use saunas and a modern gym. Taste local delicacies at our on-site restaurant, Bistro Gimis, and start the morning with a treat at our Super Breakfast buffet. Warm and hospitable service is a matter of honor for us. We have both Green Key and Sustainable Travel Finland certificates, which prove our investment in sustainable tourism and the environment.</p>
                        </div>
                        <div className='mt-8 flex items-start justify-between space-x-2' >
                            <div className='space-y-4' >
                                {/* mobile number */}
                                <div className='flex items-center space-x-2' >
                                    <p className='text-[#344767] font-bold text-sm' >Mobile:</p>
                                    <p className='text-[#7B809A] font-medium text-sm'>+234 8106673218</p>
                                </div>

                                {/* business ID */}
                                <div className='flex items-center space-x-2' >
                                    <p className='text-[#344767] font-bold text-sm' >Business ID:</p>
                                    <p className='text-[#7B809A] font-medium text-sm'>1234567-8 </p>
                                </div>

                                {/* Email */}
                                <div className='flex items-center space-x-2' >
                                    <p className='text-[#344767] font-bold text-sm' >Email:</p>
                                    <p className='text-[#7B809A] font-medium text-sm'>dontmailme@mail.com </p>
                                </div>

                                {/* Website */}
                                <div className='flex items-center space-x-2' >
                                    <p className='text-[#344767] font-bold text-sm' >Website:</p>
                                    <p className='text-[#7B809A] font-medium text-sm'>https://hideoutvillas.com/ </p>
                                </div>
                            </div>

                            <div className='space-y-4' >
                                {/* Street address */}
                                <div className='flex items-center space-x-2' >
                                    <p className='text-[#344767] font-bold text-sm' >Street Address:</p>
                                    <p className='text-[#7B809A] font-medium text-sm'> Meritullinkatu 33, 00170 Helsinki</p>
                                </div>

                                {/* City/State/Country: */}
                                <div className='flex items-center space-x-2' >
                                    <p className='text-[#344767] font-bold text-sm' >City/State/Country:</p>
                                    <p className='text-[#7B809A] font-medium text-sm'>Helsinki, Finland </p>
                                </div>

                                {/* Postal Code:  */}
                                <div className='flex items-center space-x-2' >
                                    <p className='text-[#344767] font-bold text-sm' >Postal Code: </p>
                                    <p className='text-[#7B809A] font-medium text-sm'>00170 </p>
                                </div>

                                {/* Social: */}
                                <div className='flex items-center space-x-2' >
                                    <p className='text-[#344767] font-bold text-sm' >Social:</p>

                                    <div className='flex items-center space-x-4' >
                                        <FaFacebook color='#344767' size={18} />

                                        <FaTwitter color='#16C0E8' size={18} />

                                        <FaInstagram color='#344767' size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-1/2 grid grid-cols-2 gap-6' >
                        <img src="/images/image1.png" alt="image1" className='w-full h-[150px] rounded-lg' />
                        <img src="/images/image2.png" alt="image2" className='w-full h-[150px] rounded-lg' />
                        <img src="/images/image3.png" alt="image3" className='w-full h-[150px] rounded-lg' />
                        <img src="/images/image4.png" alt="image4" className='w-full h-[150px] rounded-lg' />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className='flex items-start mt-24 w-full space-x-5' >
                {/* customer satisfaction */}
                <div className='w-[30%] h-full bg-white rounded-lg' >
                    <DoubleLineChart />
                </div>

                {/* Redemptions */}
                <div className='w-[70%] bg-white rounded-lg' >
                    <SingleLineChart />
                </div>
            </div>

            {/* Redeemed history */}
            <div className='mt-16 bg-white rounded-lg min-h-14' >
                <table className="w-full mt-4 table-auto text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 ps-6 text-sm font-medium text-gray-700">Deals ID</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Listed Deals</th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Offer Available
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Redemptions
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Price
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">Ofer Expiration</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Status</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Approval</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BusinessOverview