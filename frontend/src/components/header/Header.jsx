import React from 'react'
import UpperHeader from './UpperHeader'
import LowerHeader from './LowerHeader'

function Header({ onSidebarToggle }) {
  return (
    <div
      className='fixed top-0 w-full border-b-[1px] 
        lg:border-none border-gray-200 z-50 bg-white'>
         <UpperHeader
           className = 'px-5 lg:px-14'
           onSidebarToggle={onSidebarToggle} />
         <LowerHeader
           className='px-2 lg:px-14'/>
    </div>
  )
}

export default Header