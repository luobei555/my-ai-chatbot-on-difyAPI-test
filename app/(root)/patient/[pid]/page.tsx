import React from 'react'
import Main from "@/components/home/Main"
import Navigation from "@/components/home/Navigation"

const Home = () => {
  return (
    <div className='h-full flex'>
      <Navigation />
      <Main />
    </div>
  )
}

export default Home