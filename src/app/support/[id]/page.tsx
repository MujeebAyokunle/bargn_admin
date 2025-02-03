"use client"
import Nav from '@/components/Nav'
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { useSelector } from 'react-redux';
import { useSocket } from "../../../helper/socket"

function Chat() {

    const { socket }: any = useSocket()
    const messagesRef = useRef<HTMLDivElement>(null);

    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Array<string>>([])
    const { chatUserData } = useSelector((data: any) => data.chatUser)

    useEffect(() => {

        socket.current.emit('join_room', chatUserData?.business_id)

        socket.current.on('receive_message', (data: any) => {
            // console.log("received message")
            setMessages(data?.chats);
        });

        return () => {
            socket.current.off('receive_message');
        };
    }, []);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 20
        }
    }, [messages, messages?.length]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            // Call your function here
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (inputValue) {
            socket.current.emit('send_message', {
                text: inputValue,
                business: false,
                user_id: chatUserData?.user?.id,
                room: chatUserData?.business_id,
                business_id: chatUserData?.business_id
            });
            setInputValue("");
        }
    };

    return (
        <Nav>
            <div className='flex flex-row -m-4 bg-white fixed w-full' style={{ height: 'calc(100vh - 70px)' }} >
                {/* Left chat side */}
                <div className='w-[60%] relative pr-3 border-r border-r-[#B9B9B9]' >
                    <div className='bg-[#6366F1] flex items-center space-x-3 px-3 py-6' >
                        <img src={chatUserData?.user?.profile_picture || "https://via.placeholder.com/150"} className="bg-blue-200" style={{ borderRadius: 20, height: 40, width: 40, objectFit: "cover" }} />
                        <div >
                            <p className='text-white text-base font-bold'>{chatUserData?.user?.full_name || chatUserData?.user?.business_name}</p>
                            <p className='text-[#F3F3F3] text-sm -mt-1 font-normal' >{chatUserData?.user?.email || chatUserData?.user?.business_email}</p>
                        </div>
                    </div>
                    {/* Chats section */}
                    <div className='relative overflow-y-scroll pb-52 h-full border border-black' ref={messagesRef} >
                        <div className='p-2 space-y-2' >
                            {
                                messages?.map((message: any, index: number) => (
                                    <>
                                        {
                                            message?.message ? (
                                                <div key={index} className={`flex ${message?.sender == "admin" ? "justify-end" : "justify-start"}`} >
                                                    <div className={message?.sender == "admin" ? `bg-[#B2B2B2] p-3 rounded-tl-lg max-w-[65%] rounded-tr-lg rounded-bl-lg` : `max-w-[65%] bg-[#EEF1F6] rounded-lg p-3`} >
                                                        <p className='text-[#1E1E1E] font-normal text-base' >{message?.message}</p>
                                                    </div>
                                                </div>
                                            ) : null
                                        }
                                    </>
                                ))
                            }
                            {
                                messages?.map((message: any, index: number) => (
                                    <>
                                        {
                                            message?.message ? (
                                                <div key={index} className={`flex ${message?.sender == "admin" ? "justify-end" : "justify-start"}`} >
                                                    <div className={message?.sender == "admin" ? `bg-[#B2B2B2] p-3 rounded-tl-lg max-w-[65%] rounded-tr-lg rounded-bl-lg` : `max-w-[65%] bg-[#EEF1F6] rounded-lg p-3`} >
                                                        <p className='text-[#1E1E1E] font-normal text-base' >{message?.message}</p>
                                                    </div>
                                                </div>
                                            ) : null
                                        }
                                    </>
                                ))
                            }
                        </div>
                    </div>

                    {/* Input section */}
                    <div className='absolute -bottom-4 pb-6 PT-4 left-0 right-0 bg-[#FFFFFF] z-50' >
                        <div className='flex items-center border rounded-md  bg-wihte right-2 border-[#EEF1F6] p-2' >
                            <input type="text" className='flex-1 bg-transparent focus:outline-none text-base text-black' multiple placeholder='Send a message' value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown} />
                            <GrAttachment color='#6C7893' size={18} />
                        </div>
                    </div>
                </div>

                {/* Right activity side */}
                <div className='w-[24%] px-4 overflow-y-scroll' >
                    <div className='flex justify-center w-full'>
                        <img src={chatUserData?.user?.profile_picture || "https://via.placeholder.com/150"} className="bg-blue-200 mt-6" style={{ borderRadius: 34, height: 68, width: 68, objectFit: "cover" }} />

                    </div>
                    <div className='flex flex-col items-center justify-center w-full mt-3'>
                        <p className='text-[#404040] font-semibold text-sm' >{chatUserData?.user?.business_name}</p>
                        <p className='font-normal text-sm text-[#404040]' >{chatUserData?.user?.business_email}</p>

                        <div className='border border-[#B2B2B2] rounded-sm py-1 mt-2 px-2' >
                            <p className='text-sm font-normal text-[#1E1E1E]' >Open in User Management</p>
                        </div>
                    </div>

                    {/* Account details */}
                    <div className='mt-6 space-y-2' >
                        <p className='font-semibold text-[#404040] text-[12px]' >Account Details</p>
                        <div className='border rounded border-[#E5E7EB]' >
                            <div className='border-b p-3 border-b-[#E5E7EB]' >
                                <p className='text-[#111827] font-medium text-sm' >Phone number</p>
                                <p className='text-[#4B5563] font-normal text-sm' >+{chatUserData?.user?.phone_country_code} {chatUserData?.user?.phone_number}</p>
                            </div>

                            {/* <div className='border-b p-3 border-b-[#E5E7EB]' >
                                <p className='text-[#111827] font-medium text-sm' >Gender</p>
                                <p className='text-[#4B5563] font-normal text-sm' >{chatUserData?.user?.gender}</p>
                            </div> */}
                            {/* <div className='border-b p-3 border-b-[#E5E7EB]' >
                                <p className='text-[#111827] font-medium text-sm' >Birthday</p>
                                <p className='text-[#4B5563] font-normal text-sm' >12/12/2012</p>
                            </div> */}
                            <div className='border-b p-3 border-b-[#E5E7EB]' >
                                <p className='text-[#111827] font-medium text-sm' >Account Created On</p>
                                <p className='text-[#4B5563] font-normal text-sm' > {moment?.utc(chatUserData?.user?.createdAt).format("D/M/Y; h:m a")}</p>
                            </div>
                            {/* <div className='border-b p-3 border-b-[#E5E7EB]' >
                                <p className='text-[#111827] font-medium text-sm' >Subscription Plan</p>
                                <p className='text-[#4B5563] font-normal text-sm' >Member: Monthly Plan</p>
                            </div> */}
                            {/* <div className='border-b p-3 border-b-[#E5E7EB]' >
                                <p className='text-[#111827] font-medium text-sm' >Last Subscription</p>
                                <p className='text-[#4B5563] font-normal text-sm' >12/12/1212; 4:15pm</p>
                            </div> */}
                        </div>
                    </div>

                    {/* Recent Activities */}
                    {/* <div className='mt-4 space-y-2' >
                        <p className='font-semibold text-[#404040] text-[12px]' >Recent Activities</p>
                        <div className='border rounded border-[#E5E7EB]' >
                            <div className='border-b p-3 border-b-[#E5E7EB]' >
                                <p className='text-[#111827] font-medium text-sm' >Current device location:</p>
                                <p className='text-[#4B5563] font-normal text-sm' >Device: Android, Helsinki Finland</p>
                            </div>

                            <div className='border-b p-3 border-b-[#E5E7EB]' >
                                <p className='text-[#111827] font-medium text-sm' >Updated email address:</p>
                                <p className='text-[#4B5563] font-normal text-sm' >changed from ‘johndoenew@example.com’ to ‘johndoenew@example.com’
                                    12/12/1212; 12:12am</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </Nav>
    )
}

export default Chat