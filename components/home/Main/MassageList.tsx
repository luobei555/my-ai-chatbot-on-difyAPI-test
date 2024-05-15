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
    //  使用 useAppContext 钩子从全局状态中获取 messageList, streamingId, selectedChat 和 dispatch函数
    const {
        state: { messageList, selectedChat },
        dispatch
    } = useAppContext()

    const case_id = Cookies.get('patientId');

    async function getData(chatId: string) {
        const response = await fetch(`http://4ac26d39.r10.vip.cpolar.cn/v1/messages?user=${case_id}&conversation_id=${chatId}`, {
            method: "GET",
            headers: {
                Authorization:'Bearer app-1JYGQEIQAmmH5Gg6Uo5MOUvm'
            }
        })
        if (!response.ok) {
            console.log(response.statusText)
            return
        }
        const { data } = await response.json()
        //  通过dispatch函数更新全局状态中的messageList
        dispatch({
            type: ActionType.UPDATE,
            field: "messageList",
            value: data
        })

    }

    // 使用useEffect钩子在selectedChat变化时执行副作用
    useEffect(() => {
        if (selectedChat) {
            // 如果已选择聊天，则获取该聊天的消息列表
            getData(selectedChat.id)
        } else {
            // 如果没有选择聊天，则将messageList重置为空数组
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
                        <li key={message.id} >
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

