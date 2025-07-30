import React from 'react'
import MaskGroup from '../../assets/Maskgroup.png'

function InquirySection({

}) {
  return (
    <section className='w-full h-36 md:h-auto mt-4 px-5 md:px-8 md:py-7 flex justify-between
    bg-cover bg-center'
    style={{ backgroundImage: `url(${MaskGroup})` }}>

        {/* Info Div */}
        <div className=' md:w-1/2 text-white py-5 md:py-1'>
            <h1 className='text-base md:text-2xl font-medium'>
                An easy way to send <br/> requests to all suppliers 
            </h1>

            <p className='hidden lg:block mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing <br/>
                 elit, sed do eiusmod tempor incididunt.</p>

            <button className='md:hidden mt-2 py-1 px-2 bg-blue-500 text-white text-sm rounded-md
                    transition-all duration-150 hover:bg-blue-600'>
                Send inquiry
            </button>
        </div>


        <form 
        className='hidden md:block w-2/5 bg-white px-7 rounded-md py-5'>
            {/* Title */}
           <h1 className='text-xl font-semibold'>Send quote to suppliers</h1>

           <div className='mt-5 flex flex-col gap-4'>
                <input 
                type="text"
                placeholder='What item you need?'
                className='w-full px-2 py-1 border-[1px] border-gray-200 
                rounded-md focus:outline-0 focus:ring-0' 
                />
                <textarea name="" id=""
                placeholder='Type more details'
                className='block px-2 py-1 w-full h-15 border-[1px]
                 border-gray-200 rounded-md focus:outline-0 focus:ring-0' />
                
                 
                 <div className='flex items-center gap-1'>
                    <label 
                    htmlFor=""
                    className='pl-2 pr-20 py-0.5 border-[1px] border-gray-200 
                    rounded-md focus:outline-0 focus:ring-0'>
                        Quality
                    </label>

                    <select 
                    name="" 
                    id=""
                    className='py-1 pl-1 pr-5 border-[1px] border-gray-200
                    rounded-md focus:outline-0 focus:ring-0'>
                        <option value="1">1</option>
                    </select>
                 </div>

                 <div>
                    <button
                    className='py-1.5 px-2 bg-blue-500 text-white text-sm rounded-md
                    transition-all duration-150 hover:bg-blue-600'>
                    Send inquiry
                    </button>
                 </div>

           </div>
        </form>

    </section>
  )
}

export default InquirySection