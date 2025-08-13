import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { AiFillStar } from 'react-icons/ai'
import { FaMessage } from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { MdReport } from "react-icons/md";
import { LuBadgeInfo } from "react-icons/lu";
import { FaPen } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
import { useSelector } from 'react-redux';


function Profile({ className }) {

    const navigate = useNavigate()
    const [isActive, setIsActive] = useState('info')
    const supplier = useSelector(state => state.auth.supplier);

  return (

    <div className={`${className} mt-20 px-16 min-h-[calc(100vh-80px)]`}>
    {/* Upper div */}
    <div className='w-full flex gap-10'>

        {/* Image*/}
        <div className='w-1/4 h-60 bg-gray-100'>
            <img src="" alt="Image" />
        </div>

        
        <div className='w-2/3'>
            {/* Name */}
            <div className='w-full flex gap-4 items-start justify-between'>
                <div className='flex items-start'>

                <div>
                <h1
                className='text-2xl font-semibold'>
                    Kaif Sasoli
                </h1>
                 <p className='text-blue-500'>Ecommerce Supplier</p>
                </div>
                <p className='pt-2 text-sm flex gap-2 items-center text-textcolor'>
                    <FaLocationDot /> 
                    Paksitan, Sindh
                </p>
                </div>

                <button 
                onClick={() => navigate('/supplier/edit')}
                className='px-2 py-0.5 flex items-center gap-1.5 bg-blue-500
                 text-white rounded-md hover:bg-blue-600 cursor-pointer'>
                   <FaPen className='text-sm'/> <span>Edit</span>
                </button>
            </div>

            {/* Stars */}
            <div className='py-5'>
                <h1 className='text-sm'>Rating</h1>
                <div className='py-1 flex items-center '>
                    <span className='pr-4'>4.0</span>
                  {Array.from({ length: 5 }).map((_, index) => (
                      <AiFillStar
                        key={index}
                        className={`text-2xl ${index < Math.floor(4) ? 'text-orange-400' :
                             'text-gray-300'}`}
                      />
                    ))}
                    </div>
            </div>

            {/* Message */}
            <div className='flex items-center gap-7 text-textcolor'>

            {/* Send Message */}
            <div>
                <h1>
                 <FaMessage  className='inline mr-2'/> 
                 <span>Send message</span>
                </h1>
            </div>

             {/* Contacts */}
            <div>
               <h1>
                <RiContactsBook2Fill  className='text-xl inline mr-2'/> 
                <span>Contacts</span></h1>
            </div>

              {/* Report */}
            <div>
               <h1>
                <MdReport  className='text-2xl text-red-400 inline mr-2'/> 
                <span>Report Buyer</span>
                </h1>
            </div>
            </div>

            {/* Tabs */}
              <div className='flex mt-8 gap-5 border-b border-gray-200'>
                <h1
                onClick={() => setIsActive('info')}
                className={`flex items-center gap-2 cursor-pointer
                ${isActive === 'info' ? 'border-blue-400 border-b-2' : 'text-textcolor border-none'}`}>
                <LuBadgeInfo /> 
                <span>Info</span>
                </h1>

                <h1 
                onClick={() => setIsActive('about')}
                className={`flex items-center gap-2 cursor-pointer
                ${isActive === 'about' ? 'border-blue-400 border-b-2' : 'text-textcolor border-none'}`}>
                <MdOutlineDescription /> 
                <span>About</span>
                </h1>
            </div>

        </div>
    </div>

            {/* Lower Div */}
            <div>

                {isActive === 'info' && (
                    <div className='py-5 flex gap-10'>

                        <div className='w-1/3'>

                      {/* Upper Line */}
                        <div className='pb-5 flex items-center'>
                        <h1 className=''>
                            Store
                        </h1>
                         <span className="mt-1.5 ml-2  w-full h-[1px] bg-gray-400 inline-block rounded" />
                        </div>
                       
                       {/* Items */}
                        <div className='flex items-center justify-between'>
                            <h1 className='text-base font-medium'>
                                Ecommrace Shop 
                                <span className='text-sm block text-textcolor font-light'>
                                    Lorem ipsum dolor sit consectetur adipisicing
                                </span>
                           </h1>
                            <h1 className='text-sm py-1 px-2 bg-blue-500 rounded-md
                            text-white'>
                                Worldwide
                            </h1>
                        </div>
                        </div>

                         <div className=' w-1/2'>
                        
                        <div className='pb-5 flex items-center'>
                        <h1 className='font-medium text-textcolor'>
                            Information
                        </h1>
                        </div>

                        <table className='w-full table-auto border-spacing-2  border-separate'>
                            <tbody>
                              <tr>
                                <td className="font-medium text-gray-700">Phone:</td>
                                <td>+92 333 3333333</td>
                              </tr>                         

                              <tr>
                                <td className="break-words whitespace-normal max-w-xs">Address:</td>
                                <td>House #123, Main Boulevard, Lahore, Pakistan</td>
                              </tr>                         

                              <tr>
                                <td className="font-medium text-gray-700">Email:</td>
                                <td className="text-blue-500">ecommerce.shop@gmail.com</td>
                              </tr>                         

                              <tr>
                                <td className="font-medium text-gray-700">Website:</td>
                                <td className="text-blue-500">www.ecommerceshop.com</td>
                              </tr>
                            </tbody>
                        </table>
                        
                        
                        </div>
                    </div>
                )}


                {isActive === 'about' && (
                    <div className='py-5'>
                         {/* Upper Line */}
                        <div className='pb-5 flex items-center'>
                        <h1 className=''>
                            Description
                        </h1>
                         <span className="mt-1.5 ml-2  w-full h-[1px] bg-gray-400 inline-block rounded" />
                        </div>

                        <div className='overflow-y-auto max-h-[calc(100vh-80px)]'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo libero consectetur perspiciatis ducimus? Ab repellat labore, cum molestiae quo veritatis. Dolore ducimus laborum soluta corporis ullam enim provident, cumque incidunt!</p>
                        </div>
                    </div>
                ) }


            </div>


    </div>
  )
}

export default Profile