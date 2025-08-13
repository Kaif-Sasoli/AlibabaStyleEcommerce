import React, { useState } from 'react'
import { FaTruck } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import TrendsChart from '../../components/supplier_dashboard/TrendChart'

function SupplierDashboard() {

  const notifications = [
  { message: "Waiting for order#12345", time: "4:39" },
  { message: "Customer support id#22234", time: "11:07" },
  ];

      const activityData = [
      { label: "Confirm order update", status: "URGENT" },
      { label: "Finish shipping update", status: "URGENT" },
      { label: "Create new order", status: "NEW" },
      { label: "Update payment report", status: "DEFAULT" },
    ]

    function getStatusProps(status) {
      switch (status) {
        case "URGENT":
          return {
            icon: <FaCircle className="text-red-500" />,
            tagColor: "bg-yellow-400 text-black"
          }
        case "NEW":
          return {
            icon: <FaRegCircle className="text-gray-400" />,
            tagColor: "bg-emerald-400 text-white"
          }
        case "DEFAULT":
          return {
            icon: <FaCircleCheck className="text-blue-600" />,
            tagColor: "bg-gray-200 text-gray-600"
          }
        default:
          return {
            icon: <FaRegCircle className="text-gray-400" />,
            tagColor: "bg-gray-300 text-black"
          }
      }
    }

  return (
    <div className='mt-24 mx-10 rounded-xl'>
        
        {/* Cards */}
        <div className='flex gap-10 py-2 px-4 bg-white rounded-xl'>
           
           {/* Shipped Orders */}
           <div 
           className='px-2 pb-3 w-full flex relative text-white 
          border rounded-2xl [background-image:linear-gradient(90deg,#6BAAFC_0%,#305FEC_100%)]
          overflow-hidden'>
               <div 
               className='flex justify-between pt-2 w-1/2 text-xl font-bold'>
                <p>Shipped orders</p>
               </div>
               <div className='w-1/2 pt-7 text-6xl font-semibold text-end px-5'>
                <h1>67</h1>
               </div>

               <div className='absolute top-5 left-2 text-8xl -rotate-12
               text-blue-300 opacity-30'>
                 <FaTruck />
               </div>
           </div>

            {/* Pending orders */}
          <div 
           className='px-2 pb-3 w-full flex relative text-white 
          border rounded-2xl [background-image:linear-gradient(90deg,#EF5E7A_0%,#D35385_100%)]
          overflow-hidden'>
               <div 
               className='flex justify-between pt-2 w-1/2 text-xl font-bold'>
                <p>Pending orders</p>
               </div>
               <div className='w-1/2 pt-7 text-6xl font-semibold text-end px-5'>
                <h1>67</h1>
               </div>

               <div className='absolute top-5 left-2 text-8xl -rotate-12
               text-blue-300 opacity-30'>
                 <IoMdCart />
               </div>
           </div>

            {/* New orders */}
           <div 
           className='px-2 pb-3 w-full flex relative text-white 
          border rounded-2xl [background-image:linear-gradient(90deg,#D623FE_0%,#A530F2_100%)]
          overflow-hidden'>
               <div 
               className='flex justify-between pt-2 w-1/2 text-xl font-bold'>
                <p>New orders</p>
               </div>
               <div className='w-1/2 pt-7 text-6xl font-semibold text-end px-5'>
                <h1>67</h1>
               </div>

               <div className='absolute top-5 left-2 text-8xl -rotate-12
               text-blue-300 opacity-30'>
                 <MdShoppingBag />
               </div>
           </div>
        </div>

        {/* Div */}
        <div className='flex gap-6 mt-5'>

          {/* Left Div */}
          <div className='w-1/2'>

            {/* Inbox */}
            <div className='py-2 shadow-md rounded-xl bg-white'>
              <div className='px-5 flex justify-between'>
                <h1 className='font-bold '>
                  Inbox 
                  <span className='text-sm font-normal text-textcolor block'>
                    Group: <span className='text-gray-600'>Support</span>
                    </span>
                  </h1>
                <p className='text-blue-500 font-medium'>View details</p>
              </div>
              <table className='w-full table-auto py-1  border-separate'>
                {notifications.map((item, index) => (
                  <tr 
                  key={index} 
                  className="bg-white border border-black rounded-lg ">
                    <td 
                    className={`px-5 py-2 text-sm ${index !== notifications.length - 1 ? 'border-b' : ''}`}>
                      {item.message}
                    </td>
                    <td className={`px-4 py-2 text-sm text-right ${index !== notifications.length - 1 ? 'border-b' : ''}`}>
                      {item.time}
                    </td>
                  </tr>
                ))}
              </table>
            </div>

            {/* Right Div */}
          <div className=' py-4 bg-white rounded-xl mt-5'>
                <div className='px-5 flex justify-between'>
                <h1 className='font-bold '>
                  Recent Order
                  </h1>
                <p className='text-blue-500 font-medium cursor-pointer'>View all</p>
              </div>

               {/* List */}
               <div className=" pt-8 space-y-4 divide-y divide-gray-200">
                 {activityData.map((item, idx) => {
                   const { icon, tagColor } = getStatusProps(item.status)
                   return (
                     <div key={idx} className="px-5 flex justify-between items-center pb-4">
                       <div className="flex items-center gap-3">
                         {icon}
                         <span className="text-sm font-medium">{item.label}</span>
                       </div>
                       <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColor}`}>
                         {item.status}
                       </span>
                     </div>
                   )
                 })}
               </div>
          </div>
          </div>
        
         {/* Right Div */}
          <div className='px-5 w-1/2 bg-white rounded-xl shadow-md'>
            
            <div className='pt-2 pb-10'>
              <h1 className='text-xl font-bold' >Today’s trends</h1>
               <div className='flex justify-between'>

                   <p>30 Sept 2021</p>
                <div className="flex gap-4 items-center">
                  <p className="flex items-center gap-1">
                    <span className="w-5 h-0.5 bg-blue-500 inline-block rounded" />
                    Today
                  </p>
                  <p className="flex items-center gap-1">
                    <span className="w-5 h-0.5 bg-gray-400 inline-block rounded" />
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
             <TrendsChart />
          </div>
        </div>
    </div>
  )
}

export default SupplierDashboard