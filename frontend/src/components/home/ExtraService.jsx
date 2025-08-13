import React from 'react'
import Containers from '../../assets/Containers.png'
import { IoIosSearch } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiGooglePlayFill } from "react-icons/ri";
import { FcInspection } from "react-icons/fc";
import image108 from '../../assets/image108.png'
import image104 from '../../assets/image104.png'
import image106 from '../../assets/image106.png'
import image107 from '../../assets/image107.png'

function ExtraService({
    Servces
}) {
  return (
    <section className='mt-2 px-4 md:px-0 py-3'>

        {/* Section Title */}
         <h1 className='pb-4 text-xl font-medium'>
            Our extra services
         </h1>

        <div 
        className='grid md:grid-cols-4 gap-5 '>

        {/* Card 1 */}
         <div className='relative h-40 bg-white rounded-md shadow-xl shadow-gray-200'>
            <div className='relative h-4/6 w-full rounded-t-md overflow-hidden'>
            <img 
            src={image108}
            alt="Image"
            className='w-full h-full'/>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Icon */}
            <div className='absolute right-3 top-7/12 p-2 bg-blue-100 
            rounded-full border-[2px] border-white'>
                <IoIosSearch
                className='text-xl'/>
            </div>

            <div className='h-2/6 pr-20 md:pr-10  flex items-center'>
                 <p className='pl-4 pr-5  block text-sm '>Source from Industry Hubs</p>
            </div>
         </div>

        {/* Card 2 */}
         <div className='relative h-40 bg-white rounded-md shadow-xl shadow-gray-200'>
            <div className='relative h-4/6 w-full rounded-t-md overflow-hidden'>
            <img 
            src={image104}
            alt="Image"
            className='w-full h-full'/>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Icon */}
            <div className='absolute right-3 top-7/12 p-2 bg-blue-100 
            rounded-full border-[2px] border-white'>
                <MdOutlineInventory2
                className='text-xl'/>
            </div>

            <div className='h-2/6 pr-20 md:pr-10  flex items-center'>
                 <p className='pl-4 pr-5  block text-sm '>Source from Industry Hubs</p>
            </div>
         </div>

          {/* Card 3 */}
         <div className='hidden md:block relative h-40 bg-white rounded-md shadow-md shadow-gray-200'>
            <div className='relative h-4/6 w-full rounded-t-md overflow-hidden'>
            <img 
            src={image106}
            alt="Image"
            className='w-full h-full'/>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Icon */}
            <div className='absolute right-3 top-7/12 p-2 bg-blue-100 
            rounded-full border-[2px] border-white'>
                <RiGooglePlayFill
                className='text-xl'/>
            </div>

            <div className='h-2/6 pr-20 md:pr-10  flex items-center'>
                 <p className='pl-4 pr-5  block text-sm '>Source from Industry Hubs</p>
            </div>
         </div>

         {/* Card 4 */}
         <div className='hidden md:block relative h-40 bg-white rounded-md shadow-md shadow-gray-200'>
            <div className='relative h-4/6 w-full rounded-t-md overflow-hidden'>
            <img 
            src={image107}
            alt="Image"
            className='w-full h-full'/>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Icon */}
            <div className='absolute right-3 top-7/12 p-2 bg-blue-100 
            rounded-full border-[2px] border-white'>
                <FcInspection
                className='text-xl'/>
            </div>

            <div className='h-2/6 pr-20 md:pr-10 flex items-center'>
                 <p className='pl-4 pr-5  block text-sm '>Source from Industry Hubs</p>
            </div>
         </div>

        </div>
          <button className='md:hidden mt-3 text-blue-500 hover:to-blue-600'>
            Show More
            <FaArrowRight className='inline ml-2 '/>
          </button>
    </section>
  )
}

export default ExtraService