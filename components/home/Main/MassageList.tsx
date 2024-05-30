import { useAppContext } from "@/components/AppContext"
import Markdown from "@/components/common/Markdown"
import { ActionType } from "@/reducers/AppReducer"
import { useEffect } from "react"
import { SiOpenai } from "react-icons/si"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import Cookies from 'js-cookie';

export default function MessageList() {
    const {
        state: { messageList, selectedChat },
        dispatch
    } = useAppContext()

    const case_id = Cookies.get('patientId');
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

    async function getData(chatId: string) {
        const response = await fetch(`${API_URL}v1/messages?user=${case_id}&conversation_id=${chatId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`
            }
        })
        if (!response.ok) {
            console.log(response.statusText)
            return
        }
        const { data } = await response.json()
        dispatch({
            type: ActionType.UPDATE,
            field: "messageList",
            value: data
        })
    }

    useEffect(() => {
        if (selectedChat) {
            getData(selectedChat.id)
        } else {
            dispatch({
                type: ActionType.UPDATE,
                field: "messageList",
                value: []
            })
        }
    }, [selectedChat])

    return (
        <div className='w-full pt-10 pb-48 dark:text-gray-300'>
            <ul>
                {messageList.map((message) => {
                    return (
                        <li key={selectedChat?.historyID} >
                            <div className='w-full max-w-4xl mx-auto flex space-x-6 px-4 py-4 text-lg'>
                                <div className='flex-1 space-y-4 text-right'>
                                    <Markdown>{`${message.query}`}</Markdown>
                                </div>
                                <div className='text-3xl leading-[1] space-y-4'>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </div>
                            </div>
                            <div className='w-full max-w-4xl mx-auto flex space-x-6 px-4 py-4 text-lg'>
                                <div className='text-3xl leading-[1] space-y-4'>
                                    <SiOpenai />
                                </div>
                                <div className='flex-1 space-y-4'>
                                    <Markdown>{`${message.answer}`}</Markdown>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

