import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import ChatItem from "./ChatItem"
import { ActionType } from '@/reducers/AppReducer';
import { useAppContext } from '@/components/AppContext';
const ChatList = () => {
    const case_id = Cookies.get('patientId');
    const [chats, setChats] = useState([]);
    const {
        state: { selectedChat, messageList },
        dispatch
    } = useAppContext()

    useEffect(() => {
        fetchData();
        console.log(selectedChat)
    }, [selectedChat]);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

    /*async function deleteChat(conversation_id) {
       const response = await fetch(`${API_URL}v1/conversations/${conversation_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: `{"user":"${case_id}"}`
        });
        if (response.ok) {
            console.log("ok")
            fetchData();
        }
    }*/
    
    async function fetchData() {
        const response = await fetch(`${API_URL}v1/conversations?user=${case_id}&last_id=&limit=20`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`
            }
        });
        const data = await response.json();
        const sortedData = data.data.sort((a, b) => b.created_at - a.created_at);
        setChats(sortedData);
    }

    return (
        <div className='table-1 mb-[48px] mt-2 flex flex-col overflow-y-auto '>
            <ul>
                {chats.map((chat) => (
                    <ChatItem  key={chat.id} id={chat.id} name={chat.name}
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

