"use client"
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import ChatItem from "./ChatItem"
const ChatList = () => {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const case_id = Cookies.get('patientId');
            const response = await fetch(`http://c072951.r15.vip.cpolar.cn//v1/conversations?user=${case_id}&last_id=&limit=20`, {
                method: "GET",
                headers: {
                    Authorization: 'Bearer app-1JYGQEIQAmmH5Gg6Uo5MOUvm'
                }
            });
            const data = await response.json();
            const sortedData = data.data.sort((a, b) => b.created_at - a.created_at);
            setChats(sortedData);
        }
        fetchData();
    }, []);
    return (
        <div className='table-1 mb-[48px] mt-2 flex flex-col overflow-y-auto'>
            <ul>
                {chats.map((chat, index) => (
                    <ChatItem key={chat.id} name={chat.name} id={chat.id} conversation_id={chat.conversation_id} />
                ))}
            </ul>
        </div>
    );
}
export default ChatList