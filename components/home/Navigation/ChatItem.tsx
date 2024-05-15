import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { PiTrashBold, PiChatBold } from 'react-icons/pi';
import { MdCheck, MdClose, MdDeleteOutline } from 'react-icons/md';
import Cookies from 'js-cookie';
import { useAppContext } from '@/components/AppContext';

const ChatItem = ({ id, name, handdelete, onSelected }) => {  // Include id in props
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [title, setTitle] = useState(name);  // Initialize with name
    const case_id = Cookies.get('patientId');

    const {
        state: { messageList, selectedChat },
        dispatch
    } = useAppContext()

    async function updateChat(newName) {
        console.log(selectedChat?.conversation_id)
        const response = await fetch(`http://4ac26d39.r10.vip.cpolar.cn/v1/conversations/${selectedChat?.conversation_id}/name`, {
            method: "POST",
            headers: {
                Authorization: 'Bearer app-1JYGQEIQAmmH5Gg6Uo5MOUvm',
                'Content-Type': 'application/json'
            },
            body: `{"name": "${newName}","user":"${case_id}"}`
        });
        if (response.ok) {
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
                                    handdelete(id);
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
