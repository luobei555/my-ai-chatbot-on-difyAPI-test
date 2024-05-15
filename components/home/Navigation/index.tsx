"use client"

import React from 'react'
import Menubar from './Menubar'
import Info from './Info'
import ChatList from './ChatList'

const Navigation = () => {
  return (
    <nav className=' flex flex-col dark relative h-full w-[260px] bg-gray-900 text-gray-300 p-2'>
      <Menubar />
      <Info />
      <ChatList />
    </nav>
  )
}

export default Navigation