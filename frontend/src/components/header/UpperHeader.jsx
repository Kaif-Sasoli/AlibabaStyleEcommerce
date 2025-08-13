import React from 'react'
import Logo from '../Logo'
import Search from './Search'
import IconWrapper from '../IconWrapper'
import { FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import { useSelector } from 'react-redux';

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

      const location = useLocation()
      const navigate = useNavigate()
      const buyer = useSelector(state => state.auth.buyer)
      const supplier = useSelector(state => state.auth.supplier)

      const user = buyer || supplier || null;
      let pageTitle = '';
      let showBackArrow = false;

      if (location.pathname === '/cart') {
        pageTitle = 'Your Cart';
        showBackArrow = true;
      } else if (location.pathname === '/product') {
        pageTitle = 'Product Details';
        showBackArrow = true;
      } else if (location.pathname === '/search') {
          pageTitle = 'Search Page';
          showBackArrow = true;
      }

  return (
    <nav 
        className={`w-full flex flex-col justify-between py-1.5 lg:py-3 z-50
        ${className}`}>
       
       <div className='w-full flex items-center justify-between'>
        
        <div className='flex items-center gap-4'>
          {showBackArrow ?  (
        <>
          <FaArrowLeft 
            onClick={() => navigate(-1)}
            className="text-xl cursor-pointer md:hidden"
          />
          <h1 className="text-xl font-medium lg:hidden">{pageTitle}</h1>
          </> ) : (
          <>
         <FaBars 
          onClick={onSidebarToggle} 
          className="text-xl cursor-pointer md:hidden" 
        /> 
         {/* Brand */}
        <Logo />
        </>) }
      
      
      
        </div>

        {/* Search Box */}
        <Search 
        className='hidden lg:flex w-1/2'
        />
        
        {/* Icons */}
        <div className='flex itmes-center text-textcolor gap-2'>   
           <UserDropdown user={user} />

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
             onClick={() =>  navigate('/cart') }
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