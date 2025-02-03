"use client"
import { ColorSchema } from '@/helper/colorScheme';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsGridFill } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { IoChevronDown, IoChevronUp, IoLogOutOutline, IoSearch, IoSettingsOutline, IoSunnyOutline } from 'react-icons/io5';
import { BriefCase, ChartIcon, CommunityIcon, EducationCube, GraphIcon, HelpPolygon, InvoiceIcon, Logout, MobilePhone, PaymentCardIcon, User } from '../Svgs/icons';
import { HiOutlineUser } from 'react-icons/hi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { PiBell, PiInfo, PiSidebar } from 'react-icons/pi';
import Cookies from 'js-cookie';
import { CiStar, CiUser } from 'react-icons/ci';
import { VscHistory } from 'react-icons/vsc';
import { MdOutlineMail } from 'react-icons/md';
import { SlLock } from 'react-icons/sl';
import Logo from "../../../public/images/logo.svg"
// import { useAppSelector } from '@/lib/hooks';
import { toTitleCase, truncateString } from '@/helper/functions';
import { useAppSelector } from '@/lib/hooks';


type NavProps = {
    children: React.ReactNode;
};

function Nav({ children }: NavProps) {

    const pathName = usePathname()
    const router = useRouter()

    const [first_path, second_path] = pathName?.split("/")?.filter(data => data != "")

    const { userData } = useAppSelector(data => data.business)

    const [openOptions, setOpenOptions] = useState(false)
    const [openLeftDrop, setOpenLeftDrop] = useState(true)
    const [openUsersDrop, setOpenUsersDrop] = useState(false)
    const [openMerchantsDrop, setOpenMerchantsDrop] = useState(false)

    const navigateFunc = (url: string) => {
        router.push(url)
    }

    const toggleNav = (e: any) => {
        e.stopPropagation()
        setOpenLeftDrop(prev => !prev)
    }

    const logout = () => {
        localStorage.clear()
        Cookies.remove("token")
        Cookies.remove("rememberMe")
        setOpenOptions(false)
        router.push("/")
    }

    return (
        <div className='flex flex-row' >
            <div className='w-[20%] lg:w-[16%] border-r border-r-[#D9D9D9] fixed h-screen bg-white' >
                <div className="flex justify-center items-center my-8">
                    <Image src={Logo} alt="logo" width={130} height={150} />
                </div>

                <div onClick={() => navigateFunc("/dashboard")} className={`flex mx-4 cursor-pointer px-4 py-2 items-center ${pathName.includes("dashboard") && "nav_active"}`} >
                    <BsGridFill color='#2c2c2c' />
                    <p className='text-[#2c2c2c] ml-2 text-[16px] font-medium'>Dashboard</p>
                </div>

                <div className="py-4 px-4">
                    <nav className="space-y-6">
                        <div>

                            <ul className="mt-2 space-y-3">
                                <li onClick={() => navigateFunc("/users")} className={`flex justify-between items-center text-gray-700 px-3 py-2 w-full hover:text-black cursor-pointer ${pathName.includes("users") && "nav_active"}`}>
                                    <div className='flex text-[14px] items-center'>
                                        <User />
                                        <span className='ms-2'>Users</span>
                                    </div>

                                    {
                                        !openUsersDrop ?
                                            <IoChevronDown onClick={() => {
                                                return
                                                setOpenUsersDrop(prev => !prev)
                                            }} color={ColorSchema.black} /> :
                                            <IoChevronUp onClick={() => {
                                                return
                                                setOpenUsersDrop(prev => !prev)
                                            }} color={ColorSchema.black} />
                                    }
                                </li>
                                {
                                    openUsersDrop && (
                                        <>
                                            <li onClick={() => navigateFunc("/deals/create")} className={`flex ps-8 cursor-pointer text-[14px] items-center space-x-2 text-gray-700 ${(pathName.includes("deals") && pathName.includes("create") ? "bg-[#f7f7f7] border-l-[3px] border-l-black rounded-r-lg" : "")} py-2 hover:text-black `}>
                                                {/* ${pathName.includes("deals/create") && "nav_active"} */}
                                                <FiPlus size={22} />
                                                <span>Create deals</span>
                                            </li>
                                            <li className="flex ms-8 text-[14px] items-center space-x-2 text-gray-700 hover:text-black">
                                                <GraphIcon />
                                                <span>Track deals</span>
                                            </li>
                                            <li onClick={() => navigateFunc("/deals/manage")} className={`flex ps-8 cursor-pointer text-[14px] ${(pathName.includes("deals") && pathName.includes("manage") ? "bg-[#f7f7f7] border-l-[3px] border-l-black rounded-r-lg" : "")} py-2 items-center space-x-3 text-gray-700 hover:text-black`}>
                                                <EducationCube />
                                                <span>Manage deals</span>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>

                        <div>

                            <ul className="mt-2 space-y-3">
                                <li onClick={() => navigateFunc("/business")} className={`flex justify-between items-center text-gray-700 px-3 py-2 w-full hover:text-black cursor-pointer ${pathName.includes("business") && "nav_active"}`}>
                                    <div className='flex text-[14px] items-center'>
                                        <BriefCase />
                                        <span className='ms-2'>Businesses</span>
                                    </div>

                                    {
                                        !openMerchantsDrop ?
                                            <IoChevronDown onClick={() => {
                                                return
                                                setOpenMerchantsDrop(prev => !prev)
                                            }} color={ColorSchema.black} /> :
                                            <IoChevronUp onClick={() => {
                                                return
                                                setOpenMerchantsDrop(prev => !prev)
                                            }} color={ColorSchema.black} />
                                    }
                                </li>
                                {
                                    openMerchantsDrop && (
                                        <>
                                            <li onClick={() => navigateFunc("/deals/create")} className={`flex ps-8 cursor-pointer text-[14px] items-center space-x-2 text-gray-700 ${(pathName.includes("deals") && pathName.includes("create") ? "bg-[#f7f7f7] border-l-[3px] border-l-black rounded-r-lg" : "")} py-2 hover:text-black `}>
                                                {/* ${pathName.includes("deals/create") && "nav_active"} */}
                                                <FiPlus size={22} />
                                                <span>Create deals</span>
                                            </li>
                                            <li className="flex ms-8 text-[14px] items-center space-x-2 text-gray-700 hover:text-black">
                                                <GraphIcon />
                                                <span>Track deals</span>
                                            </li>
                                            <li onClick={() => navigateFunc("/deals/manage")} className={`flex ps-8 cursor-pointer text-[14px] ${(pathName.includes("deals") && pathName.includes("manage") ? "bg-[#f7f7f7] border-l-[3px] border-l-black rounded-r-lg" : "")} py-2 items-center space-x-3 text-gray-700 hover:text-black`}>
                                                <EducationCube />
                                                <span>Manage deals</span>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>

                        <div>
                            <ul className="mt-2 space-y-3">
                                <li onClick={() => navigateFunc("/deals")} className={`flex justify-between items-center text-gray-700 px-3 py-2 w-full hover:text-black cursor-pointer ${pathName.includes("deals") && "nav_active"}`}>
                                    <div className='flex text-[14px] items-center'>
                                        <InvoiceIcon />
                                        <span className='ms-2'>Deals</span>
                                    </div>

                                    {
                                        openLeftDrop ?
                                            <IoChevronDown onClick={() => {
                                                return
                                                setOpenLeftDrop(prev => !prev)
                                            }} color={ColorSchema.black} /> :
                                            <IoChevronUp onClick={() => {
                                                return
                                                setOpenLeftDrop(prev => !prev)
                                            }} color={ColorSchema.black} />
                                    }
                                </li>
                                {
                                    !openLeftDrop && (
                                        <>
                                            <li onClick={() => navigateFunc("/deals/create")} className={`flex ps-8 cursor-pointer text-[14px] items-center space-x-2 text-gray-700 ${(pathName.includes("deals") && pathName.includes("create") ? "bg-[#f7f7f7] border-l-[3px] border-l-black rounded-r-lg" : "")} py-2 hover:text-black `}>
                                                {/* ${pathName.includes("deals/create") && "nav_active"} */}
                                                <FiPlus size={22} />
                                                <span>Create deals</span>
                                            </li>
                                            <li className="flex ms-8 text-[14px] items-center space-x-2 text-gray-700 hover:text-black">
                                                <GraphIcon />
                                                <span>Track deals</span>
                                            </li>
                                            <li onClick={() => navigateFunc("/deals/manage")} className={`flex ps-8 cursor-pointer text-[14px] ${(pathName.includes("deals") && pathName.includes("manage") ? "bg-[#f7f7f7] border-l-[3px] border-l-black rounded-r-lg" : "")} py-2 items-center space-x-3 text-gray-700 hover:text-black`}>
                                                <EducationCube />
                                                <span>Manage deals</span>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>

                        <ul className="space-y-1">
                            <li onClick={() => navigateFunc("/management")} className={`flex px-3 py-2 items-center cursor-pointer space-x-2 text-gray-700 text-[14px] hover:text-black ${pathName.includes("management") && "nav_active"}`}>
                                <MobilePhone />
                                <span>App Management</span>
                            </li>
                            <li className="flex px-3 py-2  items-center space-x-2 text-gray-700 text-[14px] hover:text-black">
                                <ChartIcon />
                                <span>Analytics</span>
                            </li>
                            {/* <li className="flex px-3 py-2  text-[14px] items-center space-x-2 text-gray-700 hover:text-black">
                                <PaymentCardIcon />
                                <span>Revenue</span>
                            </li> */}
                        </ul>

                        <div className="border-t pt-4">
                            <ul className="space-y-4">

                                <li onClick={() => navigateFunc("/roles")} className={`flex text-[14px] items-center cursor-pointer  px-3 py-2 space-x-3 text-gray-700 hover:text-black ${pathName.includes("roles") && "nav_active"}`}>
                                    <CommunityIcon />
                                    <span>Roles & Permissions</span>
                                </li>
                                <li onClick={() => navigateFunc("/support")} className="flex cursor-pointer text-[14px] items-center space-x-3 text-gray-700 hover:text-black">
                                    <HelpPolygon />
                                    <span>Help & Support</span>
                                </li>
                                <li onClick={logout} className="flex cursor-pointer items-center space-x-3 text-gray-700 text-[14px] hover:text-black">
                                    <Logout />
                                    <span>Log Out</span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

            </div>
            <div className='w-full lg:w-[84%] flex ml-[20%] lg:ml-[16%]'>
                <div className='h-14 w-full pr-[22%] lg:pr-[18%] fixed z-10 border-b bg-white justify-between flex items-center px-6 border-b-[#B2B2B2]'>
                    <div className='flex items-center space-x-4' >
                        <PiSidebar className='cursor-pointer' size={20} color={ColorSchema.black} />

                        <CiStar className='cursor-pointer' size={22} color={ColorSchema.black} />

                        <p className='text-[#00000066] font-semibold text-sm' >{!first_path?.includes("users") ? toTitleCase(first_path) : 'User management'}</p>
                        {
                            (second_path || first_path == "dashboard" || first_path.includes("users")) ?
                                <p className='text-[#00000066] font-semibold text-sm'>/</p> : ""
                        }
                        {
                            (second_path || first_path == "dashboard" || first_path.includes("users")) ?
                                <p className='text-black font-semibold text-sm'>{second_path ? toTitleCase(second_path) : first_path.includes("users") ? "All Users" : "Analytics"}</p> : ""
                        }
                    </div>

                    <div className='flex items-center space-x-3' >
                        <div className='bg-[#0000001A] flex p-2 py-1 w-[250px] lg:w-[350px] rounded-md items-center'>
                            <IoSearch size={20} color='#00000033' />
                            <input className='outline-none text-black ms-2' type="text" placeholder='Search' style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }} />
                        </div>

                        <IoSunnyOutline className='cursor-pointer' color={ColorSchema.black} size={25} />

                        <VscHistory className='cursor-pointer' color={ColorSchema.black} size={20} />

                        <PiBell className='cursor-pointer' color={ColorSchema.black} size={20} />

                        <div onClick={() => setOpenOptions(prev => !prev)} className='flex items-center space-x-3 cursor-pointer'>
                            {
                                userData?.profile_picture &&
                                <img src={userData?.profile_picture} style={{ borderRadius: 17.5, width: 35, height: 35 }} alt='Profile_image' className='ms-3' />
                            }
                            <div>
                                <p className='text-[13px] text-[#404040] font-semibold -mb-1 leading-tight'>{truncateString(10, userData?.email)}</p>
                                <p className='text-[12px] text-[#565656] font-medium'>Admin</p>
                            </div>

                            <div className='rounded-full border border-[#5C5C5C] p-[1px]'>
                                {
                                    openOptions ? (
                                        <GoChevronUp color={ColorSchema.black} size={14} />
                                    ) : (

                                        <GoChevronDown color={ColorSchema.black} size={14} />
                                    )
                                }
                            </div>
                        </div>

                        {
                            openOptions && (
                                <div className='w-[200px] absolute right-[18%] bg-white top-[60px] rounded p-3 py-4 space-y-3' >
                                    <div onClick={() => {
                                        navigateFunc("/settings/profile")
                                        setOpenOptions(false)
                                    }} className='flex cursor-pointer space-x-2' >
                                        <HiOutlineUser color='black' size={18} />
                                        <p className='text-sm font-medium text-[#1F2937]'>Account</p>
                                    </div>
                                    <div className='flex space-x-2' >
                                        <MdOutlineMail color='black' size={15} />
                                        <p className='text-sm font-medium text-[#1F2937]'>Message</p>
                                    </div>
                                    <div onClick={() => {
                                        navigateFunc("/settings")
                                        setOpenOptions(false)
                                    }} className='flex cursor-pointer space-x-2' >
                                        <IoSettingsOutline color='black' size={18} />
                                        <p className='text-sm font-medium text-[#1F2937]'>Settings</p>
                                    </div>
                                    <div className='flex space-x-2' >
                                        <PiBell color='black' size={18} />
                                        <p className='text-sm font-medium text-[#1F2937]'>Notification</p>
                                    </div>
                                    <div className='flex space-x-2' >
                                        <SlLock color='black' size={18} />
                                        <p className='text-sm font-medium text-[#1F2937]'>Privacy</p>
                                    </div>

                                    <hr />

                                    <div className='flex space-x-2' >
                                        <PiInfo color='black' size={18} />
                                        <p className='text-sm font-medium text-[#1F2937]'>Help Center</p>
                                    </div>

                                    <div className='flex space-x-2' >
                                        <PiInfo color='black' size={18} />
                                        <p className='text-sm font-medium text-[#1F2937]'>Feedback</p>
                                    </div>

                                    <hr />

                                    <div onClick={logout} className='flex cursor-pointer space-x-2' >
                                        <IoLogOutOutline color='black' size={18} />
                                        <p className='text-sm font-medium text-[#1F2937]'>Log Out</p>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
                <div onClick={() => setOpenOptions(false)} className='p-4 bg-[#F7FAFC] w-full mt-14 min-h-screen' style={{ flex: 1 }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Nav