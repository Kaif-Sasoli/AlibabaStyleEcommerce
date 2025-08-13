import React from 'react'
import { MdOutlineEmail } from "react-icons/md";

function NewsLetter() {
  return (
    <div 
    className='py-5 w-full flex flex-col items-center bg-[#EFF2F4]'>
        <h1 
        className='text-xl font-semibold'
        >Subscribe on our newsletter
        </h1>
        <p
        className='hidden md:block text-sm text-textcolor'
        >Get daily news on upcoming offers from many suppliers all over the world</p>

        <div className='py-5 flex items-center gap-3 '>
             <div className='md:w-64 border-none rounded-md bg-white flex 
             items-center text-textcolor'>
            <MdOutlineEmail className='text-xl mx-1'/>
            <input 
            type="email"
            placeholder='Email'
            className='py-1 outline-none' />
            </div>
            <button
            className='px-2 py-1 text-white rounded-md bg-blue-500'>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter