import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function ItemsSection({
    bannerData,
    items
}) {

     const navigate = useNavigate()
  return (
    <section
        className='w-full overflow-x-scroll lg:overflow-auto flex 
        bg-white border-[1px] border-gray-200 mt-5'>

        {/* Banner */}
        <div 
        style={{backgroundImage: `url(${bannerData.image})`}}
        className='hidden lg:block w-1/4 px-4 pt-4'>
            <h1
            className='font-semibold'>{bannerData.title}</h1> 
            <button
            className='mt-5 px-7 py-0.5 rounded-md bg-white'>
                {bannerData.buttonText}
            </button>
         </div>

        {/* Items */}
        <div>

            {/* Banner Title for Mobile view */}
            <div
            className='lg:hidden text-xl py-2 px-4 '>
                <h1>{bannerData.title}</h1>
            </div>

           <div className='w-full flex lg:grid lg:grid-cols-4 
            lg:grid-rows-2 '>
            
             {items && items.map((item, index) => (
                  <div
                  onClick={() =>  navigate(`/product/${item._id}`)} 
                  key={index}
                  className='flex flex-col lg:flex-row items-center lg:items-start justify-between 
                  border border-gray-200 pt-2 lg:pt-5 lg:pl-3 px-6 lg:px-0 w-full cursor-pointer'>
                    
                     <div className='text-base flex flex-col items-center lg:items-start gap-1.5 lg:pb-3
                      order-2 lg:order-1 text-center lg:text-start'>
                        <h1>{item.title}</h1>
                        <p className='text-textcolor text-xs'>
                            From 
                           <span className='lg:block'>
                            USD {item.price}
                           </span>
                        </p>
                     </div>
                     <div className='lg:mt-5 w-auto h-20 lg:w-20 lg:h-20 order-1 lg:order-2'>
                     <img  src={Array.isArray(item.images) 
                                      ? (item.images.length > 0 ? item.images[0] : '') 
                                      : item.images} 
                           alt={item.name} 
                     className='w-full h-full object-cover' />
                     </div>
                  </div>
             ))}
           </div>
            {/* Source more for Mobile view */}
          <div
           className='lg:hidden py-3 px-3 flex items-center gap-2 text-blue-500'>
             <button  className='py-1 px-1 rounded-md active:bg-gray-100 transition-all duration-150 '>
            {bannerData.buttonText} now 
            <FaArrowRightLong
            className='ml-2 text-xl inline'/>
           </button>
          </div>

        </div>
        
    </section>
  )
}

export default ItemsSection

           