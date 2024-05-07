'use client'

import React from 'react'
import Menu from './Menu'
import Welcome from './Welcome'
import ChatInput from './ChatInput'
import { useAppContext } from '@/components/AppContext';
import MessageList from './MassageList'

const Main = () => {
  const {
    state: { selectedChat }
} = useAppContext()
  return (
    <div className=' flex-1 relative'>
      <main className=' overflow-y-auto w-full h-full bg-[#ECECEE] text-gray-900'>
        <Menu />
        {!selectedChat && <Welcome />}
        <MessageList />
        <ChatInput />
      </main>
      <div className="mx-auto max-w-2xl px-4"></div>
    </div>
  )
}

export default Main