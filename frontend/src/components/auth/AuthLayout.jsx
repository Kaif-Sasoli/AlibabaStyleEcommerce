import React from 'react'
import Header from './Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'
import Rectange from '../../assets/Maskgroup.png'

import Alibaba from '../../assets/Alibaba.png'


function AuthLayout() {
  return (
    <div>
        <Header />
        <div className='flex px-8 lg:px-12 '>
            {/* Right Side */}
            <div 
            style={{ 
               backgroundImage: `url(${Alibaba})`,
               backgroundSize: 'cover',  
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat'
             }}
              className='hidden lg:block relative px-16 w-1/2 h-lvh object-center '>
                <div className='absolute bottom-20'>
                    <h1 className='text-lg font-semibold'>Global B2B sourcing with</h1>
                    <h1 className='text-2xl font-bold'>transaction security and great savings</h1>
                </div>
             </div>
             <Outlet  />    
        </div>
          <Footer className="pt-20 hidden lg:block" />
    </div>
  )
}

export default AuthLayout