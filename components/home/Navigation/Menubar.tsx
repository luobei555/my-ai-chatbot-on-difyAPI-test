import Button from '@/components/common/Button'
import React from 'react'
import { HiPlus } from 'react-icons/hi'
import { LuPanelLeft } from 'react-icons/lu'

const Menubar = () => {
  return (
    <div className='flex space-x-3 bg-pink'>
        <Button icon={HiPlus} variant='outline' className='flex-1'>
            新建对话
        </Button>
        <Button icon={LuPanelLeft} variant='outline'>

        </Button>
    </div>
  )
}

export default Menubar