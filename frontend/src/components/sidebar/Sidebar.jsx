import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Avater from '../../assets/Avatar.png'
import IconWrapper from '../IconWrapper'
import { SlHome } from "react-icons/sl";
import { IoIosList } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineInventory2 } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { MdBusiness } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function Sidebar({isOpen, onClose}) {
  
  return (
    <>
    {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 bg-opacity-40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

    <aside className={`
      fixed top-0 left-0 h-screen w-4/5 bg-white z-50 transform transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
        
        {/* Close button */}
      <div className='absolute right-3 p-4 '>
        <IoClose className='text-2xl active:scale-105 duration-150'
        onClick={onClose}/>
      </div>

        {/* Profile Div */}
        <div 
        className='w-full bg-graycolor py-6 px-4'>
         {/* Profile Pic */}
          <div>
            <img src={Avater} alt="Avater" />
          </div>

           {/* Button Div */}
           <div 
           className='w-full mt-1.5'>
            <button
            className='active:scale-95 transition-all duration-200'>
              Sign in
              </button>

            <span className='border-[1px] mx-1.5'/>

            <button
            className='active:scale-95 transition-all duration-200'>
              Register
              </button>
           </div>
        </div>


      {/* First Section */}
        <ul className='mt-6 px-4 space-y-3 border-b-[1px] border-gray-300 py-4'>
          <li >
            <NavLink
             to="/home"
             className={({isActive}) => `flex items-center gap-2 text-gray-700 hover:text-black
            transition-all`}>
              <SlHome className="text-lg text-gray-400" />
               <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
             to="/categories"
             className={({isActive}) => `flex items-center gap-2 text-gray-700 hover:text-black
            transition-all`}>
               <IoIosList className="text-lg text-gray-400" />
               <span>Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
             to="/favourite"
             className={({isActive}) => `flex items-center gap-2 text-gray-700 hover:text-black
            transition-all`}>
              <CiHeart className="text-lg text-gray-400"/>
               Favourites
            </NavLink>
          </li>
          <li>
            <NavLink
             to="/categories"
             className={({isActive}) => `flex items-center gap-2 text-gray-700 hover:text-black
            transition-all`}>
              <MdOutlineInventory2 className="text-lg text-gray-400" />
               My orders
            </NavLink>
          </li>
        </ul>

      {/* Second Section */}
     <ul className='mt-2 px-4 space-y-3 border-b-[1px] border-gray-300 py-4'>
          <li >
            <NavLink
             to="/categories"
             className={({isActive}) => `flex items-center gap-2 text-gray-700 hover:text-black
            transition-all`}>
              <GrLanguage className="text-lg text-gray-400" />
               <span>English 
                <span className='border-r-[1px] mx-1'/>
                USD
                </span>
            </NavLink>
          </li>
          <li>
            <NavLink
             to="/categories"
             className={({isActive}) => `flex items-center gap-2 text-gray-700 hover:text-black
            transition-all`}>
               <MdOutlineHeadsetMic className="text-lg text-gray-400" />
               <span>Contact us</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
             to="/categories"
             className={({isActive}) => `flex items-center gap-2 text-gray-700 hover:text-black
            transition-all`}>
              <MdBusiness className="text-lg text-gray-400"/>
               About
            </NavLink>
          </li>
        </ul>

        {/* Third Section */}
        <ul className='mt-6 px-10 space-y-3'>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/partnership">Partnership</Link>
          </li>
          <li>
            <Link to="/user-agreement">User Agreement</Link>
          </li>
        </ul>
    </aside>
    </>
  )
}

export default Sidebar