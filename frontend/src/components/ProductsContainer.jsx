import React from 'react'
import ProductCard from './ProductCard'
import { FaArrowRightLong } from "react-icons/fa6";

function ProductsContainer({
    products,
    title,
    className = '',
    titleClass='',
    buttonClass,
    productsDivClass = '',
    productCardProps = {},
    maxItems = null,

}) {

    const visibleProducts = maxItems ? products.slice(0, maxItems) : products;

  return (
    <div className={`w-auto ${className}`}>
            
            {/* Title */}
            {title && (
                <h1 className={`pb-5 text-xl font-medium ${titleClass}`}>
                  {title}
                </h1>
            )}

            {/* Products Div */}
            <div className={`grid ${productsDivClass}`}>
                {visibleProducts.map((item, index) => (
                    <ProductCard
                    key={index}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                     {...productCardProps}
                    />
                ))}
            </div>

              <button  className={`py-1 px-1 rounded-md active:bg-gray-100 transition-all duration-150 ${buttonClass}` }>
                 See more 
                 <FaArrowRightLong
                 className='ml-2 text-xl inline'/>
                </button>
    </div>
  )
}

export default ProductsContainer