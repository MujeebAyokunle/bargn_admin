"use client"
import { FetchAppCategories, UpdateAppSegment } from '@/apis'
import ActivityLoader from '@/components/ActivityLoader'
import Nav from '@/components/Nav'
import { SortSvgIcon } from '@/components/Svgs/icons'
import { errorToast, getRandomColorWithAlpha, successToast } from '@/helper/functions'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaSearch } from 'react-icons/fa'
import { FaBars, FaBell } from 'react-icons/fa6'
import { FiChevronDown } from 'react-icons/fi'
import { GrLocation } from 'react-icons/gr'
import { MdOutlineRefresh } from 'react-icons/md'

function AppManagement() {

    const [categories, setCategories] = useState([])
    const [formattedcategories, setFormattedCategories] = useState<Array<string>>([])
    const [offers, setOffers] = useState(["Nearby Offers", "Most Popular Offers", "Featured Offers"])
    const [categoryColors, setCategoryColors] = useState<any>({});
    const [offerColors, setOfferColors] = useState<any>({});
    const [loading, setLoading] = useState<any>(false);

    useEffect(() => {

        const colors2: any = {};

        offers.forEach((offer) => {
            const { color, rgbaColor } = getRandomColorWithAlpha();
            colors2[offer] = { color, rgbaColor };
        });

        setOfferColors(colors2);
        initialize()
    }, []);

    const initialize = () => {
        FetchAppCategories(response => {
            
            if (!response?.error) {
                let temp_category_formatted = response?.categories
                setCategories(temp_category_formatted)
                let temp_formatted: any = temp_category_formatted.map((category: any) => category?.name)

                setFormattedCategories([...temp_formatted])

                const colors: any = {};
                temp_formatted?.forEach((category: any) => {
                    const { color, rgbaColor } = getRandomColorWithAlpha();
                    colors[category] = { color, rgbaColor };
                });

                setCategoryColors(colors);
            }
        })
    }

    // Function to reorder categories after drag-and-drop
    const onDragEnd = (result: any) => {

        if (!result.destination) return; // Dropped outside the list

        const reorderedCategories = Array.from(categories);
        const [removed] = reorderedCategories.splice(result.source.index, 1);
        reorderedCategories.splice(result.destination.index, 0, removed);

        const temp_formatted = reorderedCategories?.map((data: any) => data?.name)

        console.log({ reorderedCategories, removed, temp_formatted });
        setCategories(reorderedCategories);
        setFormattedCategories([...temp_formatted]);
    };

    const onDragOfferEnd = (result: any) => {

        if (!result.destination) return; // Dropped outside the list

        const reorderedOffers = Array.from(offers);
        const [removed] = reorderedOffers.splice(result.source.index, 1);
        reorderedOffers.splice(result.destination.index, 0, removed);

        setOffers(reorderedOffers);
    };

    const submitUpdates = () => {
        setLoading(true);
        let json = {
            categories: categories,
            appsegments: offers
        }

        UpdateAppSegment(json, response => {
            console.log(response)
            setLoading(false);
            if (!response?.error) {
                successToast(response.message);
                // initialize();
            } else {
                errorToast(response.message);
            }
        })
    }

    return (
        <Nav>
            {/* All users header */}
            <div className='flex items-center my-8 justify-between' >
                <p className='text-[#0A0909] font-bold text-[20px]' >App Management</p>
            </div>

            <div className='flex flex-row items-start space-x-4' >
                <div className='w-[60%] space-y-6' >


                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className='bg-white rounded-md'>
                            <div className='flex items-center p-4 justify-between border-b border-b-[#E5E7EB]'>
                                <div>
                                    <p className='text-[#374151] font-medium text-sm'>Category</p>
                                </div>
                                <div>
                                    <p className='text-[#303030] font-medium text-sm'>Position</p>
                                </div>
                            </div>

                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {formattedcategories.map((item: string, index) => {
                                                const { color, rgbaColor } = categoryColors[item] || { color: '#000000', rgbaColor: '#00000080' };

                                                return (
                                                    <Draggable key={item} draggableId={item} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div key={item} className='flex items-center px-4 py-2 justify-between' >
                                                                    <div style={{ backgroundColor: rgbaColor }} className={`p-2 py-1 rounded-full`}>
                                                                        <p style={{ color: color }} className={`font-medium text-sm`} >{item}</p>
                                                                    </div>
                                                                    <div >
                                                                        <SortSvgIcon />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    </DragDropContext>

                    <DragDropContext onDragEnd={onDragOfferEnd}>
                        <div className='bg-white rounded-md'>
                            <div className='flex items-center p-4 justify-between border-b border-b-[#E5E7EB]' >
                                <div>
                                    <p className='text-[#374151] font-medium text-sm' >Offers</p>
                                </div>
                                <div>
                                    <p className='text-[#303030] font-medium text-sm' >Position</p>
                                </div>
                            </div>

                            {/* Droppable area */}
                            <Droppable droppableId="droppable2">
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {offers.map((item, index) => {
                                                const { color, rgbaColor } = offerColors[item] || { color: '#000000', rgbaColor: '#00000080' };
                                                return (
                                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div key={index} className='flex items-center px-4 py-2 justify-between' >
                                                                    <div style={{ backgroundColor: rgbaColor }} className={`p-2 py-1 rounded-full`}>
                                                                        <p style={{ color: color }} className={`font-medium text-sm`} >{item}</p>
                                                                    </div>
                                                                    <div >
                                                                        <SortSvgIcon />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    </DragDropContext>

                    <div className='flex flex-row space-x-3 justify-end mt-4' >
                        <div onClick={initialize} className='flex cursor-pointer items-center bg-black rounded-md px-3 py-1 justify-center' >
                            <MdOutlineRefresh color='white' />
                            <p className='font-medium text-base text-white' >Reset</p>
                        </div>
                        <div onClick={submitUpdates} className='flex cursor-pointer items-center bg-[#6366F1] rounded-md px-3 py-1 justify-center' >
                            <MdOutlineRefresh color='white' />
                            {
                                loading ? (
                                    <ActivityLoader color={"white"} />
                                ) : (
                                    <p className='font-medium text-base text-white' >Save Changes</p>
                                )
                            }
                        </div>
                    </div>
                </div>


                {/* Mobile App preview */}
                <div className='w-[40%]' >
                    <div className='bg-white rounded-md p-4 h-full space-y-6' >
                        <div>
                            <p className='text-black text-center font-bold text-[20px]' >App Preview</p>
                        </div>

                        <div className='flex justify-center items-center' >
                            {/* <img src="/images/dashboard.png" alt="dashboard" className='w-[250px]' /> */}

                            {/* mobile design */}
                            <div className="bg-black w-[85%] relative rounded-lg text-white font-sans px-5 pb-20">
                                {/* Top Bar */}
                                <div className="flex justify-between items-center py-4">
                                    <div className='flex items-center justify-center bg-white' style={{ width: "30px", height: "30px", borderRadius: "15px" }} >
                                        <FaBars color={"black"} size={20} />
                                    </div>
                                    <div className="flex-1 mx-3 border border-white flex items-center px-3 py-2 rounded-full">
                                        <FaSearch className="text-gray-400" />
                                        <input type="text" placeholder="Search" className="bg-transparent text-white px-2 flex-1 focus:outline-none" />
                                    </div>
                                    <div className='flex items-center justify-center bg-white' style={{ width: "30px", height: "30px", borderRadius: "15px" }} >
                                        <FaBell color={"black"} size={20} />
                                    </div>
                                </div>

                                {/* Savings & Location */}
                                <div className="flex justify-between items-center mt-4">
                                    <div className='flex items-center space-x-1 bg-white rounded-full p-1' >
                                        <p className="text-sm text-black">You saved <span className="text-pink-500 font-bold">€450.20</span></p>
                                    </div>
                                    <div className="flex items-center text-gray-400 space-x-1">
                                        <GrLocation size={16} />
                                        <span className="text-white text-sm">Helsinki, Finland</span>
                                        <FiChevronDown color='white' size={18} />
                                    </div>
                                </div>

                                {/* Featured Deal */}
                                <div className="mt-6 rounded-lg">
                                    <img src="/images/merchant_frame.png" alt="Restaurant" className="w-full h-40 rounded-lg" />
                                </div>

                                {/* Categories */}
                                <div className="grid grid-cols-5 gap-4 mt-6">
                                    {categories.map((cat: any, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            {
                                                cat?.icon?.includes("xml") ? (
                                                    <object
                                                        data={cat?.icon}
                                                        type="image/svg+xml"
                                                        style={{ width: 40, height: 40, borderRadius: 20 }}
                                                    >
                                                        Your browser does not support XML images.
                                                    </object>
                                                ) : (
                                                    <img src={cat?.icon} style={{ width: 40, height: 40, borderRadius: 20 }} />
                                                )
                                            }
                                            <p className="text-xs text-center text-gray-400 mt-1">{cat?.name}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Nearby Offers */}
                                <div className="mt-6 rounded-lg">
                                    <img src="/images/Banner.png" alt="Restaurant" className="w-full h-30 rounded-lg" />
                                </div>

                                <div className="mt-6 rounded-lg">
                                    <img src="/images/deals.png" alt="Restaurant" className="w-full h-30 rounded-lg" />
                                </div>

                                {/* Subscribe CTA */}
                                <div className='absolute bottom-0 left-0 right-0' >
                                    <div className=" backdrop-blur-[4px] p-4 flex items-center justify-between text-center">
                                        <h3 className="font-medium text-sm text-#f9f9f9[]">Unlock more deals</h3>
                                        <button className="bg-gradient-to-r from-[#F77A79] to-[#D100D3] text-white text-sm rounded-full font-medium px-2 py-1">Subscribe</button>
                                    </div>

                                    <img src="/images/bottom_nav.png" alt="Restaurant" className="w-full h-30 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Nav>
    )
}

export default AppManagement