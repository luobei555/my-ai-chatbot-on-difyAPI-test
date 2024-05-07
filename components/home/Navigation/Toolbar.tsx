import React from 'react'
import Button from '@/components/common/Button'
import { MdDarkMode, MdInfo } from 'react-icons/md'

const Toolbar = () => {
  return (
    <div className='absolute bottom-0 left-0 right-0 bg-gray-800 flex p-2 justify-between'>
        <Button icon={MdDarkMode} variant='text'>
            
        </Button>
        <Button icon={MdInfo} variant='text'>

        </Button>
    </div>
  )
}

export default Toolbar