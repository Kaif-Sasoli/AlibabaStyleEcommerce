import React from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";

function SavedFroLaterProducts({ products }) {
  return (
    <section className='mt-5 md:px-3 lg:px-0 px-0'>

        {/* Title */}
        <h1 className='pb-4 text-xl font-medium'>
            Saved for later
        </h1>

        {/* Card Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-2  md:gap-4'>
            
            {products && products.map((product, index) => (
            <div
            key={index}
            className='w-full md:w-60 flex md:flex-col h-auto px-2 py-2 border-[1px] border-gray-200 bg-white rounded-md
            shadow-md hover:shadow-2xl shadow-gray-200  '>

                {/* Image */}
                <div  className='w-24 h-24 md:h-full md:w-full md:bg-gray-100 md:p-3'>
                <img 
                src={product.image} 
                alt="Product"
                className='w-full h-full' />
                </div>
                 
                <div className='pr-5'>
                {/* Price */}
                <p>${product.price}</p>

                {/* Discription */}
                <p className='text-sm text-textcolor'>
                {product.title}
                </p>

                <div className='py-2 flex text-sm gap-2 md:justify-between'>
                    <button className='flex items-center py-1 px-2 border
                     border-gray-200 text-blue-500 rounded-md cursor-pointer
                     hover:bg-gray-100 active:bg-gray-200 transition-all'>
                        <MdOutlineShoppingCart />
                        Move to cart
                    </button>

                    <button
                    className='md:hidden flex items-center py-1 px-2 border
                     border-gray-200 text-red-500 rounded-md cursor-pointer
                     hover:bg-gray-100 active:bg-gray-200 transition-all'>
                         Remove
                    </button>
                </div>
                </div>
            </div>
            ))}
            
        </div>
    </section>
  )
}

export default SavedFroLaterProducts