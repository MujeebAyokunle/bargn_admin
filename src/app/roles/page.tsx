"use client"
import { DeleteAdmin, FetchRolesNPermissionsApi, InviteAdminApi } from '@/apis'
import InputField from '@/components/InputField'
import Modal from '@/components/Modal'
import Nav from '@/components/Nav'
import SelectField from '@/components/SelectField'
import { errorToast, getPages, successToast } from '@/helper/functions'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { GoPencil } from 'react-icons/go'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { IoEllipsisVertical, IoMailOutline } from 'react-icons/io5'
import { LuMail } from 'react-icons/lu'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ActivityLoader from '@/components/ActivityLoader'
import { useRouter } from 'next/navigation'

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
});

function RolesNPermissions() {

    const router = useRouter()

    const [activeTab, setActiveTab] = useState("all users")
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [idToDelete, setIdToDelete] = useState(0)
    const [roles, setRoles] = useState([])
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    useEffect(() => {
        init()
    }, [pageNumber, activeTab])

    const init = async () => {
        let json = {
            pageNumber,
            status: activeTab?.toLowerCase() == "all users" ? "" : activeTab?.toLowerCase()
        }

        FetchRolesNPermissionsApi(json, response => {

            if (!response?.error) {
                setUsers(response?.admins)
                const temp_arrays = response?.admin_roles.map((data: any) => data?.role)
                setRoles(temp_arrays)

                setTotalPages(response?.totalPages)
            }
        })
    }

    const onPageChange = (page: number) => {
        setPageNumber(page)
    }

    const inviteFunc = (values: any, resetForm: any) => {

        setLoading(true)

        let json = {
            email: values?.email,
            role: values?.role
        }
        InviteAdminApi(json, response => {
            setLoading(false)
            if (!response?.error) {
                successToast(response?.message)
                resetForm()
                setShowModal(false)
                init()
            } else {
                errorToast(response?.message)
            }
        })
    }

    const deleteAdminFunc = (id: number) => {
        setDeleteLoading(true)
        setIdToDelete(id)
        DeleteAdmin(id, response => {
            setDeleteLoading(false)
            if (!response?.error) {
                successToast(response?.message)
                init()
            } else {
                errorToast(response?.message)
            }
        })
    }

    console.log({ users })

    return (
        <Nav>
            {/* All users header */}
            <div className='flex items-center my-8 justify-between' >
                <p className='text-[#0A0909] font-bold text-[20px]' >Roles & Permissions</p>

                <div onClick={() => setShowModal(true)} className='flex cursor-pointer p-1 px-2 space-x-1 items-center bg-[#6366F1] border border-[#6366F1] shadow-md rounded-md' >
                    <IoMailOutline color='#fff' size={18} />
                    <p className='text-white font-normal text-[15px]' >Send Invite</p>
                </div>
            </div>

            {/* table */}
            <div className='p-4 border mt-8 bg-white border-[#D9D9D9] rounded-lg'>
                <div className='py-2 border-b flex items-center w-full justify-between' >
                    <div>
                        {["All Users", "Active", "Sent", "Deactivated"].map((tab, index) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 border ${index == 0 && "rounded-tl-md rounded-bl-md"} ${index == 3 && "rounded-tr-md rounded-br-md"} ${activeTab.toLowerCase() === tab.toLowerCase() ? "bg-[#F3F4F6]" : "bg-white"}`}
                                style={{ borderColor: "rgba(0,0,0,0.2)" }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <IoEllipsisVertical className='cursor-pointer' color='#374151' size={17} />
                </div>

                {/* table */}
                <table className="w-full mt-4 table-auto text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 ps-6 text-sm font-medium text-gray-700">Name</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Email</th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Role
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Status
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">
                                Invite Date
                            </th>
                            <th className="p-2 text-sm font-medium text-gray-700">Registration Date</th>
                            <th className="p-2 text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.length > 0 && (
                                <>
                                    {users.map((user: any, index) => (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-50 transition duration-150"
                                        >
                                            <td className="p-4 flex items-center space-x-4">

                                                <img src={user?.profile_picture || "https://via.placeholder.com/150"} className="bg-blue-200" style={{ borderRadius: 20, height: 40, width: 40, objectFit: "cover" }} />
                                                <span className="text-sm font-medium text-[#111827]">
                                                    {user?.name || user?.email?.split("@")?.[0]}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-[#111827]">{user?.email}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user?.role || "admin"}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user?.status}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user?.createdAt ? moment(user.createdAt).local().format('D MMMM YYYY') : ""}</td>
                                            <td className="p-4 text-sm text-[#111827]">{user?.createdAt ? moment(user?.registration_date).local().format('D MMMM YYYY') : "None"}</td>
                                            <td className="p-4 text-sm text-[#111827]">
                                                <div className='flex items-center space-x-3' >
                                                    <GoPencil onClick={() => router.push(`/roles/${user?.id}`)} color='black' size={18} className='cursor-pointer' />

                                                    {
                                                        deleteLoading && idToDelete == user?.id ? (
                                                            <ActivityLoader color={"black"} />
                                                        ) : (
                                                            <RiDeleteBin6Line onClick={() => deleteAdminFunc(user?.id)} color='black' size={18} className='cursor-pointer' />
                                                        )
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )
                        }
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

            {
                showModal && (
                    <Modal
                        close={() => {
                            setShowModal(false)
                        }}
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4" >
                            <div className='flex justify-end items-end' >
                                <IoIosCloseCircleOutline onClick={() => setShowModal(false)} size={22} color='black' className='cursor-pointer' />
                            </div>
                            <div>
                                <p className='text-black font-semibold text-[22px] text-center' >Send Invite</p>
                            </div>
                            <Formik
                                initialValues={{ email: "", role: "" }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    inviteFunc(values, resetForm)
                                }}
                            >
                                {({ setFieldValue, values }) => (
                                    <Form>
                                        <div>
                                            <InputField setValue={(value: string) => setFieldValue("email", value)} value={values.email} label="User Email" icon={<LuMail color='black' size={18} />} placeholder={"Email address"} />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                                            <SelectField value={values.role} setValue={(param: string) => setFieldValue("role", param)} label="Role" options={roles} />
                                            <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        <div className='flex flex-row items-center justify-between my-3'>
                                            <div onClick={() => setShowModal(prev => !prev)} className='border cursor-pointer w-[25%] p-2 py-[5px] border-black rounded-lg' >
                                                <p className='text-black text-center text-base font-medium' >Cancel</p>
                                            </div>

                                            <button type="submit" className='border cursor-pointer w-[70%] p-2 py-[5px] border-[#6366f1] bg-[#6366f1] rounded-lg text-white text-center text-base font-medium'>
                                                {
                                                    loading ? <ActivityLoader />
                                                        : "Send"
                                                }
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Modal>
                )
            }
        </Nav>
    )
}

export default RolesNPermissions