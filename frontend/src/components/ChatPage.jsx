import React, { useState } from 'react'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';

import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const ChatPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [selectedChat, setSelectedChat] = useState({});
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
        console.log(user);
        axios.get("http://localhost:4000/chat").then((res) => {
            console.log(res.data);
            return res.data;
        })
    }, [dispatch, isAuthenticated]);

    // useEffect(() => {
    //     fetchAllChatsofCurrentUser();
    // }, [chats, setChats]);

    return (
        <>
            <div class="container mx-auto shadow-lg rounded-lg border-cyan-50">

                <div class="flex flex-row justify-between bg-slate-900 body-font">
                    {/* <!-- chat list --> */}
                    <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                        {/* <!-- search compt --> */}
                        <div class="border-b-2 py-4 px-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                            />
                        </div>
                        {/* <!-- end search compt --> */}
                        {/* <!-- user list --> */}
                        <div
                            class="flex flex-row py-4 px-2 justify-center items-center border-b-2"
                        >
                            <div class="w-1/4">
                                <img
                                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                    class="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="w-full">
                                <div class="text-lg font-semibold text-zinc-200">Luis1994</div>
                                <span class="text-gray-500">Pick me at 9:00 Am</span>
                            </div>
                        </div>
                        <div class="flex flex-row py-4 px-2 items-center border-b-2">
                            <div class="w-1/4">
                                <img
                                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                                    class="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="w-full">
                                <div class="text-lg font-semibold text-zinc-200">Everest Trip 2021</div>
                                <span class="text-gray-500">Hi Sam, Welcome</span>
                            </div>
                        </div>
                        <div
                            class="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
                        >
                            <div class="w-1/4">
                                <img
                                    src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                    class="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="w-full">
                                <div class="text-lg font-semibold text-zinc-200">MERN Stack</div>
                                <span class="text-gray-500">Lusi : Thanks Everyone</span>
                            </div>
                        </div>
                        <div class="flex flex-row py-4 px-2 items-center border-b-2">
                            <div class="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    class="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="w-full">
                                <div class="text-lg font-semibold text-zinc-200">Javascript Indonesia</div>
                                <span class="text-gray-500">Evan : some one can fix this</span>
                            </div>
                        </div>
                        <div class="flex flex-row py-4 px-2 items-center border-b-2">
                            <div class="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    class="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="w-full">
                                <div class="text-lg font-semibold text-zinc-200">Javascript Indonesia</div>
                                <span class="text-gray-500">Evan : some one can fix this</span>
                            </div>
                        </div>

                        <div class="flex flex-row py-4 px-2 items-center border-b-2">
                            <div class="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    class="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="w-full">
                                <div class="text-lg font-semibold text-zinc-200">Javascript Indonesia</div>
                                <span class="text-gray-500">Evan : some one can fix this</span>
                            </div>
                        </div>
                        {/* <!-- end user list --> */}
                    </div>
                    {/* <!-- end chat list --> */}
                    {/* <!-- message --> */}
                    <div class="w-full px-5 flex flex-col justify-between">
                        <div class="flex flex-col mt-5">
                            <div class="flex justify-end mb-4">
                                <div
                                    class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                >
                                    Welcome to group everyone !
                                </div>
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    class="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="flex justify-start mb-4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    class="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                                <div
                                    class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                                    at praesentium, aut ullam delectus odio error sit rem. Architecto
                                    nulla doloribus laborum illo rem enim dolor odio saepe,
                                    consequatur quas?
                                </div>
                            </div>
                            <div class="flex justify-end mb-4">
                                <div>
                                    <div
                                        class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                    >
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Magnam, repudiandae.
                                    </div>

                                    <div
                                        class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                    >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Debitis, reiciendis!
                                    </div>
                                </div>
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    class="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="flex justify-start mb-4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    class="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                                <div
                                    class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                >
                                    happy holiday guys!
                                </div>
                            </div>
                        </div>
                        <div class="py-5">
                            <input
                                class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                                type="text"
                                placeholder="type your message here..."
                            />
                        </div>
                    </div>
                    {/* <!-- end message --> */}
                </div>
            </div>
        </>
    )
}

export default ChatPage
