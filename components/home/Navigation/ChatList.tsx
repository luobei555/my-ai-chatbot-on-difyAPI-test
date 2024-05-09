"use client"
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import ChatItem from "./ChatItem"
import { ActionType } from '@/reducers/AppReducer';
import { useAppContext } from '@/components/AppContext';
const ChatList = () => {
    const case_id = Cookies.get('patientId');
    const [chats, setChats] = useState([]);
    const {
        state: { selectedChat },
        dispatch
    } = useAppContext()


    useEffect(() => {
        fetchData();
    }, []);


    async function deleteChat(id) {
       const response = await fetch(`http://db59210.r11.vip.cpolar.cn/v1/conversations/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: 'Bearer app-1JYGQEIQAmmH5Gg6Uo5MOUvm',
                'Content-Type': 'application/json'
            },
            body: `{"user":"${case_id}"}`
        });
        if (response.ok) {
            console.log("ok")
            fetchData();
        }
    }
    
    async function fetchData() {
        const response = await fetch(`http://db59210.r11.vip.cpolar.cn/v1/conversations?user=${case_id}&last_id=&limit=20`, {
            method: "GET",
            headers: {
                Authorization: 'Bearer app-1JYGQEIQAmmH5Gg6Uo5MOUvm'
            }
        });
        const data = await response.json();
        const sortedData = data.data.sort((a, b) => b.created_at - a.created_at);
        setChats(sortedData);
    }

    return (
        <div className='table-1 mb-[48px] mt-2 flex flex-col overflow-y-auto'>
            <ul>
                {chats.map((chat, index) => (
                    <ChatItem handdelete={deleteChat} key={chat.id} name={chat.name} id={chat.id} conversation_id={chat.conversation_id} 
                    onSelected={() => {
                        return dispatch({
                            type: ActionType.UPDATE,
                            field: "selectedChat",
                            value: chat
                        });
                    }} />
                ))}
            </ul>
        </div>
    );
}
export default ChatList

