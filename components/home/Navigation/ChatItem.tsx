import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { PiTrashBold, PiChatBold } from 'react-icons/pi';
import { MdCheck, MdClose, MdDeleteOutline } from 'react-icons/md';
import Cookies from 'js-cookie';
import { ActionType } from '@/reducers/AppReducer'

import { useAppContext } from '@/components/AppContext';

const ChatItem = ({ id, name, onSelected }) => {  // Include id in props
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [title, setTitle] = useState(name);  // Initialize with names
    const case_id = Cookies.get('patientId');

    const {
        state: { messageList, selectedChat },
        dispatch
    } = useAppContext()

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

    async function updateChat(newName) {
        const response = await fetch(`${API_URL}v1/conversations/${id}/name`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: `{"name": "${newName}","user":"${case_id}"}`
        });
        if (response.ok) {
            dispatch({
                type: ActionType.UPDATE,
                field: "selectedChat",
                value: {
                    name: newName,
                }
            })
            console.log(newName);
        }
    }

    async function deleteChat(id) {
        const response = await fetch(`${API_URL}v1/conversations/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: `{"user":"${case_id}"}`
        });
        if (response.ok) {
            dispatch({
                type: ActionType.UPDATE,
                field: "selectedChat",
                value: ""
            })
            console.log("ok");
        }
    }

    return (
        <li className='relative group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 bg-gray-800 pr-[3.5em]' 
        onClick={() => {
            onSelected()
        }}>
            <div>{deleting ? <PiTrashBold /> : <PiChatBold />}</div>
            {editing ? (
                <input
                    value={title}
                    autoFocus={true}
                    className='flex-1 min-w-0 bg-transparent outline-none'
                    onChange={(e) => setTitle(e.target.value)}
                />
            ) : (
                <div className='relative flex-1 whitespace-nowrap overflow-hidden text-white'>
                    <span>{title}</span>  {/* Display the title */}
                </div>
            )}
            <div className='absolute right-1 flex'>
                {editing || deleting ? (
                    <>
                        <button
                            onClick={(e) => {
                                if (deleting) {
                                    deleteChat(id);
                                } else {
                                    updateChat(title);
                                }
                                setDeleting(false);
                                setEditing(false);
                                e.stopPropagation();
                            }}
                            className='p-1 hover:text-white'
                        >
                            <MdCheck />
                        </button>
                        <button
                            onClick={(e) => {
                                setDeleting(false);
                                setEditing(false);
                                e.stopPropagation();
                            }}
                            className='p-1 hover:text-white'
                        >
                            <MdClose />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={(e) => {
                                setEditing(true);
                                e.stopPropagation();
                            }}
                            className='p-1 hover:text-white'
                        >
                            <AiOutlineEdit />
                        </button>
                        <button
                            onClick={(e) => {
                                setDeleting(true);
                                e.stopPropagation();
                            }}
                            className='p-1 hover:text-white'
                        >
                            <MdDeleteOutline />
                        </button>
                    </>
                )}
            </div>
        </li>
    )
}

export default ChatItem;
