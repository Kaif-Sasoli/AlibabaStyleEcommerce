import React from 'react'
import USAflag from '../../assets/USAFlag.png'

function BottomFooter() {
  return (
    <div 
        className='w-full flex items-center justify-between lg:py-5 
        py-2.5 lg:px-20 px-2 bg-graycolor text-sm'> 
        <div>
            <h4> &copy; 2025 Ecommarce</h4>
        </div>
        <div className='flex items-center gap-1.5 text-sm lg:pr-10'>
            <span>English</span>
            <img 
            src={USAflag} 
            alt="Flag"
            className='w-4 h-4' />
        </div>
    </div>
  )
}

export default BottomFooter