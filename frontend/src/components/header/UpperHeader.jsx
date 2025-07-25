import React from 'react'
import Logo from '../Logo'
import Search from './Search'
import IconWrapper from '../IconWrapper'
import { FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

function UpperHeader({
        onSidebarToggle,
        className='',
        ...props
    }) {

    const categories = [
        'All Categories',
        'Electronics',
        'Fashion',
        'Groceries',
        'Toys',
        'Books',
      ]
  return (
    <nav 
        className={`w-full flex flex-col justify-between py-1.5 lg:py-3 z-50
        ${className}`}>
       
       <div className='w-full flex items-center justify-between'>
        
        <div className='flex items-center gap-4'>
       {/* Bar */}
          <FaBars 
          onClick={onSidebarToggle}
          className='text-xl lg:hidden'/>

       {/* Logo */}
        <Logo/>
        </div>

        {/* Search Box */}
        <Search 
        className='hidden lg:flex w-1/2'
        options={categories}
        />
        
        {/* Icons */}
        <div className='flex itmes-center text-textcolor gap-2'>   
            <div 
            className='flex flex-col items-center cursor-pointer hover:text-gray-500'>
            <IconWrapper Icon={FaUser} />
             <h1 className='text-sm'>Profile</h1>
            </div>

             <div 
             className='hidden lg:flex flex-col items-center cursor-pointer hover:text-gray-500'>
            <IconWrapper Icon={MdMessage} />
             <h1 className='text-sm'>Message</h1>
            </div>

            <div 
             className='hidden lg:flex flex-col items-center cursor-pointer hover:text-gray-500'>
            <IconWrapper Icon={FaHeart}  />
             <h1 className='text-sm'>Order</h1>
            </div>

             <div 
             className='flex flex-col items-center cursor-pointer hover:text-gray-500 '>
            <IconWrapper Icon={FaCartShopping} />
             <h1 className='text-sm'>Cart</h1>
            </div>
        </div>
        </div>
         <Search
         className='lg:hidden my-1.5 bg-[#F7FAFC]'/>
    </nav>
  )
}

export default UpperHeader