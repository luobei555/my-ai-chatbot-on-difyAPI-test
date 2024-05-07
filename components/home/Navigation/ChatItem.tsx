import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { PiTrashBold, PiChatBold } from 'react-icons/pi'
import { MdCheck, MdClose, MdDeleteOutline } from 'react-icons/md'
import Cookies from 'js-cookie';

const ChatItem = (name, index) => {
    
    const [editing, setEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [title, setTitle] = useState(false)
    const [response, setResponse] = useState('');
    const case_id = Cookies.get('patientId');

    async function updateChat() {
        // Implement update chat functionality
        const response = await fetch(`http://c072951.r15.vip.cpolar.cn/v1/conversations/${name}`, {
        method: "POST",
        headers: {
          Authorization: 'Bearer app-1JYGQEIQAmmH5Gg6Uo5MOUvm'
        },body: JSON.stringify({
            name: "abc-123", 
            user: `${case_id}`
        })
      });
    }

    // Function to delete chat
    async function deleteChat() {
        // Implement delete chat functionalityconst case_id = Cookies.get('patientId');
      const response = await fetch(`http://c072951.r15.vip.cpolar.cn/v1/conversations/${name}`, {
        method: "DELETE",
        headers: {
          Authorization: 'Bearer app-1JYGQEIQAmmH5Gg6Uo5MOUvm',
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
            user: `${case_id}`
        })
      });
      console.log(response).json();
    }
    return (
        <li className='relative group flex items-center p-3 space-x-3 cursor-pointer rounded-md hover:bg-gray-800 bg-gray-800 pr-[3.5em]'>
            <div>{deleting ? <PiTrashBold /> : <PiChatBold />}</div>
            {editing ? (
                <input
                    autoFocus={true}
                    className='flex-1 min-w-0 bg-transparent outline-none'
                    onChange={(e) => {
                        // Handle input change if needed
                    }}
                />
            ) : (
                <div className='relative flex-1 whitespace-nowrap overflow-hidden'>
                    <span
                        className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 bg-gradient-to-l`}
                    ></span>
                </div>
            )}

            <div className='absolute right-1 flex'>
                {editing || deleting ? (
                    <>
                        <button
                            onClick={(e) => {
                                if (deleting) {
                                    deleteChat()
                                } else {
                                    updateChat()
                                }
                                setDeleting(false)
                                setEditing(false)
                                e.stopPropagation()
                            }}
                            className='p-1 hover:text-white'
                        >
                            <MdCheck />
                        </button>
                        <button
                            onClick={(e) => {
                                setDeleting(false)
                                setEditing(false)
                                e.stopPropagation()
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
                                setEditing(true)
                                e.stopPropagation()
                            }}
                            className='p-1 hover:text-white'
                        >
                            <AiOutlineEdit />
                        </button>
                        <button
                            onClick={(e) => {
                                setDeleting(true)
                                e.stopPropagation()
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

export default ChatItem