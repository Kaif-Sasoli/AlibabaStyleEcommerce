import React, { useState, useEffect, useRef } from 'react'
import { FaUser } from "react-icons/fa"
import IconWrapper from '../IconWrapper'
import { FacebookSVG, GoogleSVG, LinkedinSVG } from '../SVGs'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { toast } from 'react-toastify';

function UserDropdown({ user }) {

      const dispatch = useDispatch()
      const navigate = useNavigate()
      const [isOpen, setIsOpen] = useState(false)
      const dropdownRef = useRef(null)
      const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

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
      
      // Handle screen resize
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1024)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }, [])
  
      useEffect(() => {
        if (!isMobile || !isOpen) return
      
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
          }
        }
      
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }, [isOpen, isMobile])
  
      const handleClick = () => {
        if (isMobile) setIsOpen(!isOpen)
      }
  
       const handleMouseEnter = () => {
        clearTimeout(hideTimeout.current)
        setIsOpen(true)
      }
  
      const handleMouseLeave = () => {
        hideTimeout.current = setTimeout(() => {
          setIsOpen(false)
        }, 200) 
      }
  

  return (
    <div 
      className={`relative ${isMobile ? '' : 'group'}`}
      onClick={handleClick}
      ref={dropdownRef}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      {/* Icon */}
      <div className="flex flex-col items-center cursor-pointer hover:text-gray-500">
        <IconWrapper Icon={FaUser} />
        <h1 className="text-sm">Profile</h1>
      </div>

      <div className={`
        absolute lg:left-1/2 transform -translate-x-1/2 mt-1 w-40 lg:w-80
        bg-white rounded-md shadow-xl z-50 border py-2 lg:py-5 text-black
        ${isMobile ? (isOpen ? 'block' : 'hidden') : 'hidden group-hover:block'}
        transition-all duration-300
      `}>
        {user ? (
          <div>
            <p className="px-4 font-semibold text-lg mb-2">Hi, {user.firstName}</p>
            <ul className="space-y-2 text-sm">
              <li className="py-1 px-4 text-base cursor-pointer hover:bg-gray-100 hover:font-semibold">
               <Link to={user.role === 'supplier' ? '/supplier/dashboard' : '/buyer/dashboard'}>
                  Dashboard
               </Link>
              </li>
              <li className="py-1 px-4 text-base cursor-pointer hover:bg-gray-100 hover:font-semibold">
                Orders
              </li>
              <li className="py-1 px-4 text-base cursor-pointer hover:bg-gray-100 hover:font-semibold">
                Messages
              </li>
              <li className="py-1 px-4 text-base cursor-pointer hover:bg-gray-100 hover:font-semibold">
                RFQs
              </li>
              <li 
              onClick={handleLogout}
              className="py-1 px-4 text-base cursor-pointer hover:bg-red-50 text-red-500 hover:font-semibold">
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <div className="px-2 lg:px-4">
            <h2 className="font-medium">
              Welcome to Alibaba.com!
            </h2>
            <button 
            onClick={() => navigate('/signin')}
            className=" bg-orange-500 hover:bg-orange-600 text-white w-full 
             py-1 lg:py-2 rounded-full my-4 font-semibold">
              Sign in
            </button>
            <p className="text-center text-sm text-gray-500 mb-2">
              Or, continue with:
            </p>
            <div className="flex justify-between px-3 lg:px-10 mb-4">
              <FacebookSVG size={35} />
              <GoogleSVG size={35} />
              <LinkedinSVG size={35} />
            </div>
            <p className="text-xs text-gray-400 text-center">
              By signing in via social media, I agree to the
              <a href="#" className="text-blue-600 underline mx-1">Membership Agreement</a>
              and
              <a href="#" className="text-blue-600 underline mx-1">Privacy Policy</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDropdown
