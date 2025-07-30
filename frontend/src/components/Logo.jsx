import React from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi";

function Logo({
    className='',
    textClass = 'text-xl'

}) {
  return (
    <div 
      className={`w-fit flex items-center gap-2 ${className} `}>
        
         <div
          className={`text-white bg-secondary p-2 rounded-md relative
          z-10 ${className}`}>
          <HiOutlineShoppingBag />

            <div className='bg-secondary3 w-full h-full px-1.5 absolute rounded-md -z-10
                top-0  left-1'/>
          </div>
       
       <p 
        className={`${textClass} text-secondary2 font-bold `}
       >Brand</p>
    </div>
  )
}

export default Logo