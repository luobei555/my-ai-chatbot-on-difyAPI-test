import { useAppContext } from '@/components/AppContext'
import Button from '@/components/common/Button'
import { ActionType } from '@/reducers/AppReducer'
import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { MdRefresh } from 'react-icons/md'
import { PiLightningFill, PiStopBold } from 'react-icons/pi'
import TextareaAutoSize from "react-textarea-autosize"
import Cookies from 'js-cookie';

const ChatInput = () => {
  const case_id = Cookies.get('patientId');
  const [response, setResponse] = useState('');
  const [messageText, setMessageText] = useState("")
  const {
    state: { messageList, selectedChat },
    dispatch
  } = useAppContext()
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  const createSession = async () => {
    try {
      const response = await fetch(`${API_URL}v1/chat-messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {},
          query: `${messageText}`,
          response_mode: "blocking",
          user: `${case_id}`,
          conversation_id: selectedChat?.id ?? ''
        }),
      });
      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2)); // 格式化 JSON 输出
    dispatch({
      type: ActionType.UPDATE,
      field: "messageList",
      value: [...messageList, {
        query: `${messageText}`,
        answer: data.answer
      }]
    });
    dispatch({
      type: ActionType.UPDATE,
      field: "selectedChat",
      value: {
        name: "New conversation",
        id: data.conversation_id,
    }
  });
    setMessageText(''); // 清空文本区域内容
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div className='absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]'>
      <div className='w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4'>
        <div className='flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4'>
          <div className='mx-3 mb-2.5 text-primary-500'>
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            className='outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0'
            placeholder='我是MedAsk AI...'
            rows={1} 
            value={messageText}
            onChange={(e) => {
                setMessageText(e.target.value)
            }}
          />
          <Button
            className='mx-3 !rounded-lg'
            icon={FiSend}
            onClick={createSession}
          />
        </div>
        <div className="text-sm text-gray-500 mx-3">
          您的咨询由MedAsk AI回复，关于您的重要医疗决策请结合咨询专业医生。
        </div>
        <div style={{ height: '50px' }} />
      </div>
    </div>
  )
}

export default ChatInput
