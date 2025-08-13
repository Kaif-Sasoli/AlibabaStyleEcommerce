import React from 'react'
import Rectangle from '../assets/Rectangle.png'

function Banner({className = ''}) {
  return (
    <div className={`w-full flex justify-between rounded-md bg-[#005ADE] ${className}`}>

        <div className='w-2/3 text-white py-7 px-5 bg-center bg-cover rounded-md'
        style={{ backgroundImage: `url(${Rectangle})` }}>
            <h1
             className='font-semibold text-xl'>
                Super discount on more than 100 USD
            </h1>
            <p className='text-white/60'>Have you ever finally just write dummy info</p>
        </div>

        <div className='w-1/3 flex justify-end items-center px-7'>
            <button className=' px-3 py-1.5 rounded-md text-white 
            cursor-pointer bg-[#FF9017] hover:bg-amber-500 transition-all duration-100'>
            Shop now
        </button>
        </div>
      
    </div>
  )
}

export default Banner