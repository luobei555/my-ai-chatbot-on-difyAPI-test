import { useAppContext } from '@/components/AppContext'
import Button from '@/components/common/Button'
import { Action, ActionType } from '@/reducers/AppReducer'
import React, { useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { MdRefresh } from 'react-icons/md'
import { PiLightningFill, PiStopBold } from 'react-icons/pi'
import TextareaAutoSize from "react-textarea-autosize"
import Cookies from 'js-cookie';

const ChatInput = () => {
  const case_id = Cookies.get('patientId');
  const [messageText, setMessageText] = useState("");
  const [messageQueue, setMessageQueue] = useState([]);
  const {
    state: { messageList, selectedChat },
    dispatch
  } = useAppContext();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

  useEffect(() => {
    return () => {
      if (streamReader) {
        streamReader.cancel();  // 组件卸载时取消流
      }
    };
  }, []);

  let streamReader = null;

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
          response_mode: "streaming",
          user: `${case_id}`,
          conversation_id: selectedChat?.id ?? ''
        }),
      });
      const stream = response.body;

      // 创建一个新的 ReadableStream 对象
      streamReader = stream.getReader();

      // 开始读取流
      while (true) {
        const { done, value } = await streamReader.read();
        //console.log('Raw stream value:', new TextDecoder().decode(value));
        if (done) break;
        const text = new TextDecoder().decode(value);
        const jsonStr = text.replace(/^data: /, '');
        handleStreamMessage(JSON.parse(jsonStr));
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
    setMessageText(''); // 清空文本区域内容
  };

  const handleStreamMessage = (data) => {
    if (data.event === 'message') {
      dispatch({
        type: ActionType.UPDATE,
        field: "messageList",
        value: [...messageList, {
          answer: data.answer
        }]
      });
    } else if (data.event === 'message_end') {
      console.log('Stream ended');
      streamReader.cancel();  // 取消流
      dispatch({
        type: ActionType.UPDATE,
        field: "selectedChat",
        value: {
            name: "New conversation",
            id: data.conversation_id,
        }
      })
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
