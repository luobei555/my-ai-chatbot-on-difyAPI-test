import React from 'react'
import Logo from "./Logo"

const Welcome = () => {
  return (
    <div className='w-full max-w-4xl mx-auto flex flex-col items-center px-4 py-20'>
        <Logo />
        <h1 className='mt-0 text-4xl font-bold'>
        MedAsk AI
        </h1>
    </div>
  )
}

export default Welcome