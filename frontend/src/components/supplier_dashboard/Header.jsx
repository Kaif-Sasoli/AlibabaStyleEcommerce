import React from 'react'
import IconWrapper from '../IconWrapper'
import { FaBell } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Avatar from '../../assets/Avatar.png'
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector } from 'react-redux';

function Header({className='', title = "Dashboard" }) {
         
    const avatar = useSelector(state => state.auth.supplier?.avatar)

  return (
    <header className={`fixed z-10 px-16 py-4 flex justify-between items-center border-b lg:border-none 
    ${className}`}>

    {/* Toggle button mobile view */}
      <div className='lg:hidden'>
        <FaBarsStaggered />
      </div>  
      <div className='hidden lg:block'>
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>

      <div className='w-2/5 flex gap-5 items-center'>
        {/* Search box */}
        <div className='w-full hidden lg:flex items-center gap-2 px-2 py-1 border border-gray-300 
        backdrop-blur-2xl bg-white/60 rounded-md'>
            <span>
            <IoMdSearch />
            </span>
            <input 
            type="text"
            placeholder='Search'
            className='py-1 bg-transparent text-sm 
            placeholder:text-gray-400 focus:outline-none' />
        </div>

        {/* Icon */}
        <IconWrapper 
        Icon={FaBell} 
        iconClassName='hidden lg:block text-gray-500 text-xl'/>  

        <div className='w-12 h-9 flex items-center'>
            <img src={avatar || Avatar}  alt="Avatar"
             className="w-full h-full object-cover rounded-full" />    
        </div> 

      </div>
    </header>
  )
}

export default Header