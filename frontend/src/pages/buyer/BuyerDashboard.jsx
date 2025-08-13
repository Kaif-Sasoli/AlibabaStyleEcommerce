import React, { useEffect } from 'react'
import { getProfile } from '../../services/buyerService'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../store/authSlice';
import { toast } from 'react-toastify';

function BuyerDashboard() {

  const dispatch = useDispatch()

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

  const profile = async () => {
    try {
      const response =  await getProfile()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const getCookies = async () => {
     try {
         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/check-cookie`, 
          { withCredentials: true }
         )
         console.log(response)
     } catch (error) {
        console.log(error)
     }
  }
   

  return (
    <div className='w-1/3 flex flex-col gap-2'>
      <h1>Welcome to HOme</h1>
      <button 
      className='bg-blue-500'
      onClick={profile}>
        Profile
      </button>
      <button
      onClick={getCookies} className='bg-amber-300'>
        Get Cookie
      </button>
      <button 
      onClick={handleLogout}
      className='bg-red-300 text-white'>Logout</button>
    </div>
  )
}

export default BuyerDashboard