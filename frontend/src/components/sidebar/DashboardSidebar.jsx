import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import Logo from '../../components/Logo'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiSidebar } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import  IconWrapper from '../IconWrapper'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { toast } from 'react-toastify';


    const items = [
      { label: 'Dashboard', path: '/supplier/dashboard', icon: MdDashboard },
      { label: 'Orders', path: '/orders', icon: HiOutlineShoppingBag },
    ];

function DashboardSidebar({ 
          items = [], 
          activeItem = '', 
          isSidebarOpened, 
          setIsSidebarOpened 
        }) {

      const dispatch = useDispatch();
      const [isHovered, setIsHovered] = useState(true)

       const handleLogout = () => {
      dispatch(logoutUser())
        .unwrap()
        .then(() => {
          window.location.href = "/";
        })
        .catch((err) => {
          toast.error(err?.error || "Logout failed");
          console.error("Logout failed:", err);
        });
    };
  

  return (
    <div 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    className={` fixed py-5 h-screen flex flex-col justify-between transition-all duration-300 
      ease-in-out overflow-hidden bg-white
      ${isSidebarOpened ? 'px-3 w-70' : 'w-14'}`}>

   <div className='w-full flex gap-y-16 flex-col justify-between'>
    <div className={`w-full flex ${isSidebarOpened ? 'hidden justify-start' : 'justify-center'}
     transition-all duration-300 ease-in-out`}>
      {isHovered ? (
         <div className={`w-full flex rounded-md
          ${isSidebarOpened ? 'justify-end' : 'justify-center'}`}>
          <button 
          onClick={() => setIsSidebarOpened(!isSidebarOpened)}
          className={`px-2 py-1.5 flex hover:bg-gray-100 rounded-md`}>
            <FiSidebar className="text-xl cursor-pointer text-textcolor" />
          </button>
          </div>
        ) : (
          <Logo
            className="text-sm"
            textClass={`text-2xl ${isSidebarOpened ? 'block' : 'hidden'}`}
          />
        )}
      </div>

      <div className={`w-full flex ${isSidebarOpened ? 'justify-between' : 'hidden'}
        transition-all duration-300 ease-in-out`}>
         <div className={`w-full flex justify-between rounded-md`}>
            <Logo
            className="text-sm"
            textClass={`text-2xl ${isSidebarOpened ? 'block' : 'hidden'}`}
          />
          <button 
          onClick={() => setIsSidebarOpened(!isSidebarOpened)}
          className={`px-2 py-1.5 flex hover:bg-gray-100 rounded-md`}>
            <FiSidebar className="text-xl cursor-pointer text-textcolor" />
          </button>
          </div>
      </div>

       {/* Items */}
      <ul className={`flex flex-col gap-2
        ${isSidebarOpened ? '' : 'items-center'}`}>
        {items.map((item, index) => (
            <Link to={item.path} key={index}>
              <li className={`px-2 py-1 text-xl flex items-center gap-5 rounded-md
               cursor-pointer transition-all duration-200
                ${isSidebarOpened ? 'justify-start ' : 'justify-center w-10'}
                ${activeItem === item.label ? 'bg-blue-200 text-blue-800 shadow-md' :
                   'hover:bg-gray-100 text-textcolor'}`}
              >
                <IconWrapper Icon={item.icon} />
                <span className={`${isSidebarOpened ? 'block' : 'hidden'}`}>{item.label}</span>
              </li>
            </Link>   
          ))}
      </ul>
      </div>

     
      {/* Logout Button */}
      <div 
      onClick={handleLogout}
      className='px-3 py-1 text-xl text-red-500 flex items-center gap-5'>
        <IconWrapper
        Icon={IoLogOut}
        className='text-2xl' />
        <span>Logout</span>
      </div>

    </div>
  )
}

export default DashboardSidebar