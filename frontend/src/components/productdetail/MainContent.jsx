import React from 'react'
import ProductImageCarousel from './ProductImageCarousel'
import { AiFillStar } from 'react-icons/ai'
import { LuMessageSquareText } from "react-icons/lu";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import SupplierInfo from './SupplierInfo';
import { FiHeart } from 'react-icons/fi'

import TShirt from '../../assets/TShrit.png'
import Coat from '../../assets/Coat.png'
import Jacket from '../../assets/Jacket.png'
import BlockDetail from './BlockDetail';

function MainContaint({  
    className = '',
    supplier, 
}) {

     const details = [
    { label: "Price", value: "Negotiable" },
    { label: "Category", value: "Electronics, gadgets" },
    { label: "Material", value: "Plastic material" },
    { label: "Design", value: "Modern nice" },
    { label: "Protection", value: "Refund Policy" },
    { label: "Warranty", value: "2 years full warranty" },
  ];


  const productImages = [
    TShirt,
    Coat,
    Jacket,
  ];


  return (
    <div className={`w-full flex flex-col md:flex-row bg-white p-3 rounded-md ${className} `}>

      {/* Product Images */}
        <ProductImageCarousel 
        className='w-full md:w-[300px]'
        images={productImages}/>


        {/* Product Info */}
        <div className='2/3 md:px-4 py-0 md:pr-10'>
             
             {/* In Stock */}
               <h1 className='hidden md:flex items-center gap-2 text-green-500'>
                <span><FaCheck/></span>
                 In stock
                 </h1>
             

             {/* Title */}
              <h1
              className='text-xl font-medium'
              >Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle</h1>
             

             {/* Rating */}
              <div 
              className=' flex items-center gap-2 text-sm  text-textcolor '>
        
              {/* Stars */}
              <div className='flex'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <AiFillStar
                      key={index}
                      className={index < Math.floor(4) ? 'text-orange-400' : 'text-gray-300'}
                    />
                  ))}
                  </div>
                  <span className='text-orange-400'>5.0</span>
                  
                  <div className='flex items-center gap-2'>
                     <span className="text-gray-400 text-2xl">•</span>
                     <LuMessageSquareText className='mt-1 text-lg' />
                     <span className=''>32</span>
                     <span>reviews</span>
                  </div>

                  <div className='flex items-center gap-2'>
                     <span className= "text-gray-400 text-2xl">•</span>
                     <MdOutlineShoppingBasket  className='text-lg'/>
                     <span>154</span>
                     <span>sold</span>
                  </div>
              </div>

              {/*  Trade Price */}
              <div className='flex w-full py-1.5 md:px-2 md:bg-[#FFF0DF]'>
                 
                 <div className='pr-5  flex items-center md:block md:border-r border-gray-300'>
                  <h1 className='font-medium text-red-500' >$98.00</h1>
                  <p className='text-sm text-textcolor'>50-100 pcs</p>
                 </div>

                  <div  className='hidden md:block pr-5 px-1.5 border-r border-gray-300' >
                  <h1 className='font-medium'>$98.00</h1>
                  <p className='text-sm text-textcolor' >50-100 pcs</p>
                 </div>

                  <div  className='hidden md:block pr-5 px-1.5 border-r border-gray-300'>
                  <h1 className='font-medium' >$98.00</h1>
                  <p className='text-sm text-textcolor'>50-100 pcs</p>
                 </div>

                  {/* In Stock */}
               <h1 className='md:hidden flex items-center gap-2 text-green-500'>
                <span><FaCheck/></span>
                 In stock
                 </h1>
              </div>

              {/* Send Inquiry for Mobile View */}
              <div className='w-full md:hidden flex items-center justify-between gap-2'>
                 <button 
                   className=" w-full my-2 bg-blue-600 text-white py-2 rounded-md cursor-pointer
                    hover:bg-blue-700 transition">
                   Send inquiry
                 </button>
                  <button className={`bg-gray border-1 py-2.5 px-2.5 border-gray-200 rounded-md`}>
                  <FiHeart className="text-xl text-blue-500" />
                  </button>
              </div>

             <div className="max-w-md mx-auto md:mt-6 font-sans">
              <table className="w-full border-separate md:border-spacing-y-2">
                <tbody>
                  {details.map((item, index) => {
                    const isHiddenOnMobile = index >= 4;
                    return (
                      <tr
                        key={index}
                        className={`border-b border-gray-300 ${
                          isHiddenOnMobile ? 'hidden md:table-row' : ''
                        }`}
                      >
                        <td className="py-0.5 pr-4 text-textcolor text-sm w-1/3">
                          {item.label}:
                        </td>
                        <td className="text-sm text-gray-800">{item.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
        </div>

        <BlockDetail className='py-2 md:hidden'/>

        {/* Supplier info */}
        <SupplierInfo 
        className='mt-1.5 md:mt-0 lg:w-1/4 h-full'
        name="Rahim"
        company="Guanjoi Trading LLC"
        location="Pakistan, Karachi"
        verified={true}
        shipping={true}
/> 
    </div>
  )
}

export default MainContaint