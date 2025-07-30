import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function ProductCard({
    view,
    image,
    title,
    newPrice,
    oldPrice,
    rating,
    orders,
    shipping,
    description,
    className=''
}) {

     const navigate = useNavigate()
  return (
            <div 
            onClick={() => { navigate('/product') }}
            className={`w-full border-[1px] border-gray-200 p-3 rounded-md flex gap-4 
            bg-white shadow-md ${view === 'grid' ? 'flex-col' : 'flex-row'} ${className}`}>
        
              {/* Image */}
              <div className={`flex items-center justify-center flex-shrink-0
                ${view === 'grid' ? 'w-full' : 'md:w-36 md:mx-3'}`}>
                <img src={image} alt={title} 
                className={`w-28 h-28 lg:w-36 lg:h-36 object-cover rounded-md`} />
              </div>
        
               {/* Content */}
              <div className="md:flex-1">
        
                <div className={`flex justify-between items-start`}>
                  <h2 className={`font-medium md:text-base  
                    ${view === 'grid' ? 'text-[14px] break-words text-textcolor' : 'text-[14px] md:text-base'}`}>
                        {title}
                 </h2>
                  <button className={`bg-gray border-1 border-gray-200 rounded-md
                  ${view === 'grid' ? 'px-0.5 py-0.5' : 'px-1.5 py-1.5'}`}>
                    <FiHeart className="text-xl text-blue-500" />
                  </button>
                </div>
        
                <div className={`  `}>
                {/* Pricing */}
                <div className="mt-1 flex items-center gap-2">
                  <p className={`text-lg font-semibold ${view === 'grid' ? 'text-base' : 'text-lg'}`}>
                    ${newPrice ? newPrice : oldPrice}</p>
                 {oldPrice && (
                  <p className="line-through text-sm text-gray-400">${oldPrice}</p>
                )}
                </div>
        
                {/* Ratings, Orders, Shipping */}
                <div className="flex items-center gap-2 text-sm mt-1">
                  
                {/* Stars */}
                <div className='flex'>
                  {Array.from({ length: 5 }).map((_, index) => (
                      <AiFillStar
                        key={index}
                        className={index < Math.floor(rating) ? 'text-orange-400' : 'text-gray-300'}
                      />
                    ))}
                    </div>
                  <span>{rating}</span>

                  <div className={` ${view === 'grid' ? 'hidden' : 'static'} 
                  md:flex-row flex gap-2`}>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{orders} orders</span>
                 {shipping && ( 
                  <> <span className="hidden md:block text-gray-400">•</span>
                     <span className="hidden md:block text-green-600">Free shipping</span>
                 </> ) }
                  </div>
                </div>
                {shipping && (
                    <span className="md:hidden text-sm text-green-600">
                    Free shipping
                  </span>
                ) }
                
                </div>
        
                {/* Description */}
            <p className={`hidden  text-sm text-gray-600 mt-2 line-clamp-2
                ${view === 'grid' ? 'hidden' : 'md:block'}`}>
                    {description}
                    </p>
        
                {/* View Details */}
                <button
                  className={`hidden text-blue-500 md:mt-2 text-sm hover:underline
                    ${view === 'grid' ? 'hidden' : 'static'}`}
                >
                  View details
                </button>
              </div>
        
            </div>

  )
}

export default ProductCard