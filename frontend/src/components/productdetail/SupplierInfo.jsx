import React, { useEffect, useState } from 'react'
import USAFlag from '../../assets/USAFlag.png'
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { FiHeart } from 'react-icons/fi'
import { useCountryFlag } from '../hooks/useCountryFlag';
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

function SupplierInfo({
    addToCart,
    productId,
    supplierId,
    className='',
    name, 
    company, 
    location = '', 
    verified, 
    shipping, 
    onInquiryClick, 
    onProfileClick 

}) {
    
    const country = location.split(',')[0].toLowerCase(); 
    const flagUrl = useCountryFlag(country);
   

  return (

    <div className={`flex  flex-col gap-5 ${className}`}>
    <div className={`px-2 py-4 bg-white border border-gray-200
    rounded-md shadow`}>
      
      {/* Seller */}
      <div className='w-full px-1 flex justify-between border-b border-gray-200 '>

      <div className='flex gap-1.5'>
      <div className="w-11 h-11 rounded-md bg-teal-100 
      text-sm font-bold flex items-center justify-center">
        <h1 className='text-[#4CA7A799] text-2xl'>
            {name?.charAt(0) || 'R'}
            </h1>
      </div>
        <div className=''>
            <p className="text-sm text-gray-500 ">{name}</p>
            <h3 className="text-base font-semibold mb-3">{company}</h3>
        </div>
        </div>

        <button className=' md:hidden text-textcolor cursor-pointer active:scale-105'>
            <FaChevronRight />
        </button>

     </div>
      

      <div className="flex gap-3 md:gap-1.5 md:flex-col text-sm text-gray-700 md:py-5 pt-2 space-y-1 md:mb-3">
        <p className='flex items-center gap-3'>
            {flagUrl && <img src={flagUrl} alt="Flag" className='w-6 h-4 rounded-xs' />}
             <span className="text-lg md:text-base block md:hidden">{location.split(',')[0]}</span> 
             <span className="text-lg md:text-base hidden md:block">{location}</span>
        </p>
            {verified ? (
               <p className="flex items-center gap-1.5 md:gap-4">
                 <MdOutlineVerifiedUser className="text-xl" />
                 <span className="text-lg md:text-base block md:hidden">Verified</span> {/* Mobile */}
                 <span className="text-lg md:text-base hidden md:block">Verified Seller</span> {/* Desktop */}
               </p>
             ) : (
               <p className="flex items-center gap-1.5  md:gap-4">
                 <GoUnverified className="text-xl" />
                 <span className="text-lg md:text-base block md:hidden">Unverified</span>
                 <span className=" text-lg md:text-base hidden md:block">Unverified Seller</span>
               </p>
             )}

        <p>{shipping ? (
               <p className="flex items-center gap-1.5 lg:gap-4">
                 <MdLanguage className="text-xl" />
                 <span className="text-lg md:text-base block md:hidden">Worldwide</span> {/* Mobile */}
                 <span className="text-lg md:text-base hidden md:block">Worldwide shipping</span> {/* Desktop */}
               </p>
             ) : (
               <p className="flex items-center gap-1.5 lg:gap-4">
                 <MdOutlineVerifiedUser className="text-xl" />
                 <span className="text-lg md:text-base block md:hidden">Resitricted shipping</span>
                 <span className="text-lg md:text-base hidden md:block">Resitricted</span>
               </p>
             )}
             </p>
      </div>

      <button 
        className="hidden md:block w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer
         hover:bg-blue-700 transition"
        onClick={onInquiryClick}
      >
        Send inquiry
      </button>
      <button 
        className="hidden md:block w-full mt-2 border border-gray-300 text-blue-600 py-2 rounded-md
         hover:bg-gray-100 transition cursor-pointer"
        onClick={onProfileClick}
      >
        Seller's profile
      </button>
    </div>

    <button 
    onClick={() => addToCart(productId)}
    className='hidden  w-full md:flex text-blue-500 items-center gap-3 
    hover:to-blue-700 justify-center cursor-pointer'>
     <MdOutlineShoppingCart  className='mt-1 text-xl'/> Move to Cart</button>
</div>

        )
}

export default SupplierInfo