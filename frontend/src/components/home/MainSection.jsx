import React from 'react'
import { Link, useNavigate } from "react-router-dom";
// import Avater from '../../assets/Avatar2.png'

function MainSection({
    categories = [], 
    bannerData, 
    user,
    className='',
    ...props

}) {

   const navigate = useNavigate()

  return (
      <section 
        className='w-full flex flex-row lg:gap-2 bg-white rounded-md lg:px-2 lg:py-3
       '>
          
          {/* First Div */}
          <div className='hidden lg:block basis-1/4'>
             <ul className="flex flex-col text-sm gap-1 h-64 overflow-y-auto custom-scrollbar">
            {categories.map(category => (
              <li
                key={category._id}
                className="rounded-sm py-1 px- hover:bg-gray-100"
              >
                <Link to={`/search?q=${encodeURIComponent(category.name)}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
          </div>

          {/* Second Div */}
          <div 
          style={{ backgroundImage: `url(${bannerData.image})`}}
          className='lg:basis-3/5 md:w-full h-44 md:h-64 lg:h-auto w-full bg-cover bg-center 
           py-2'>

            <div className='py-2 px-5 md:pt-14 md:px-10 lg:pt-10 lg:px-10'>
                <h2
                className='lg:text-xl'
                >{bannerData.subtitle}
                </h2>
                <h1
                className='text-2xl font-semibold lg:font-bold'
                >{bannerData.title}
                </h1>
                <button
                className='mt-1 px-2 py-1 text-sm lg:text-base bg-white rounded-md
                hover:bg-gray-100 transition-all duration-150'>
                    {bannerData.buttonText}
                </button>
            </div>
          </div>
         
         {/* Third Div */}
          <div className='hidden basis-1/5 lg:flex flex-col gap-2'>

            {/* 1st div */}
            <div
            className='flex-grow-[3] w-full bg-blue-100 px-2 py-2 rounded-md'>

              <div className='flex gap-2'>
                 <img src={user.avatar} alt="Avater"
                 className='w-10 h-10'/>
                 <h1
                 className='text-sm'>Hi, {user.name} <br/>
                  let's get stated </h1>
              </div> 

              {/* Join Now Button */}
              <button 
              onClick={() => navigate('/accounttype')}
              className='w-full my-1.5 text-white bg-blue-500 py-0.5 rounded-md
              hover:bg-blue-600 transition-all duration-150  block'>
                Join now
              </button>
                 
                 {/* Log in Button */}
                <button
                onClick={() => navigate('/signin')}
                className='w-full py-0.5 rounded-md text-blue-500 bg-white
                hover:bg-gray-100 transition-all duration-150'>
                   Log in
                </button>
              </div>

            {/* 2nd div */}
            <div className='flex-grow bg-[#F38332] rounded-md text-sm
             text-white px-3 py-2 hover:bg-orange-400 transition-all duration-150'>
                <p>
                    Get US $10 off <br/> with a new <br/> supplier
                </p>
            </div>

            {/* 3rd div */}
            <div className='bg-[#55BDC3] rounded-md text-white px-3 py-2
            text-sm hover:bg-teal-500 transition-all duration-150'>
                <p>Send quotes with <br/> supplier <br/> preferences</p>
            </div>
             
          </div>
      </section>
      
  )
}

export default MainSection