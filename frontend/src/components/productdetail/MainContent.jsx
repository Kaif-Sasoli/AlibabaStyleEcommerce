import React from 'react'
import ProductImageCarousel from './ProductImageCarousel'
import { AiFillStar } from 'react-icons/ai'
import { LuMessageSquareText } from "react-icons/lu";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import SupplierInfo from './SupplierInfo';
import { FiHeart } from 'react-icons/fi'
import BlockDetail from './BlockDetail';
import { categories } from '@/dummyData';
import { addToCart as addToCartService } from '../../services/cartService'
import { toast } from 'react-toastify';

function MainContaint({  className = '', product }) {
     const productId = product._id || null;
     const supplier = product?.supplier || {};
     const title = product?.title || 'No title';
     const category = product?.category?.name || '';
     const price = Number(product?.price) || 0;
     const images = product?.images || [];
     const rating = product?.stars || 0;
     const reviewsCount = product?.reviews?.length || 0;
     const sold = product?.totalOrders || 0;
     const material = product?.material || 'N/A';
     const quantity = product?.quantity || 0;
     const reviews = product?.reviews || []
    const warranty =
    typeof product?.warranty === 'number' && !isNaN(product.warranty) && product.warranty > 0
    ? `${product.warranty} years full warranty`
    : 'No warranty';

    const priceRange2 = price * 0.98;
    const priceRange3 = price * 0.95;


     const details = [
    { label: "Price", value: "Negotiable" },
    { label: "Category", value: category },
    { label: "Material", value: material },
    { label: "Design", value: "Modern nice" },
    { label: "Protection", value: "Refund Policy" },
    { label: "Warranty", value: warranty },
  ];

    const  addToCart =  async (productId) => {
       try {
          const response = await addToCartService(productId)
          toast.success(response.message)
       } catch (error) {
         toast.error(error)
       }
    }

  return (
    <div className={`w-full flex flex-col md:flex-row bg-white p-3 rounded-md ${className} `}>

      {/* Product Images */}
        <ProductImageCarousel 
        className='w-full md:w-[300px]'
        images={images}/>


        {/* Product Info */}
        <div className='md:mr-auto md:px-4 py-0 md:pr-10'>
             
             {/* In Stock */}
             <h1
                  className={`hidden md:flex items-center gap-2 text-sm text-green-500 ${
                    quantity > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <span className={quantity > 0 ? 'block' : 'hidden'}>
                    <FaCheck />
                  </span>
                  {quantity > 0 ? 'In Stock' : 'Sold Out'}
                </h1>
             

             {/* Title */}
              <h1
              className='text-xl font-medium'
              >{title}</h1>
             

             {/* Rating */}
              <div 
              className=' flex items-center gap-2 text-sm  text-textcolor'>
        
              {/* Stars */}
              <div className='flex'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <AiFillStar
                      key={index}
                      className={index < Math.floor(4) ? 'text-orange-400' : 'text-gray-300'}
                    />
                  ))}
                  </div>
                  <span className='text-orange-400'>{rating.toFixed(1)}</span>
                  
                  <div className='flex items-center gap-2'>
                     <span className="text-gray-400 text-2xl">•</span>
                     <LuMessageSquareText className='mt-1 text-lg' />
                     <span className=''>{reviewsCount}</span>
                     <span>reviews</span>
                  </div>

                  <div className='flex items-center gap-2'>
                     <span className= "text-gray-400 text-2xl">•</span>
                     <MdOutlineShoppingBasket  className='text-lg'/>
                     <span>{sold}</span>
                     <span>sold</span>
                  </div>
              </div>

              {/*  Trade Price */}
              <div className='flex md:w-96 py-1.5 md:px-2 md:bg-[#FFF0DF]'>
                 
                 <div className='pr-5 flex items-center gap-2 md:gap-0 md:block md:border-r border-gray-300'>
                  <h1 className='font-medium text-red-500' >${price.toFixed(2)}</h1>
                  <p className='text-sm text-textcolor'>50-100 pcs</p>
                 </div>

                  <div  className='hidden md:block pr-5 px-1.5 border-r border-gray-300' >
                  <h1 className='font-medium'>${priceRange2.toFixed(2)}</h1>
                  <p className='text-sm text-textcolor' >100-200 pcs</p>
                 </div>

                  <div  className='hidden md:block pr-5 px-1.5 border-r border-gray-300'>
                  <h1 className='font-medium' >${priceRange3.toFixed(2)}</h1>
                  <p className='text-sm text-textcolor'>150-200 pcs</p>
                 </div>

                  {/* In Stock */}
               <h1
                  className={`md:hidden flex items-center gap-2 ${
                    quantity > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <span className={quantity > 0 ? 'block' : 'hidden'}>
                    <FaCheck />
                  </span>
                  {quantity > 0 ? 'In Stock' : 'Sold Out'}
                </h1>
              </div>

              {/* Send Inquiry for Mobile View */}
              <div className='w-full md:hidden flex items-center justify-between gap-2'>
                 <button 
                   className=" w-full my-2 bg-blue-600 text-white py-2 rounded-md cursor-pointer
                    hover:bg-blue-700 transition">
                   Send inquiry
                 </button>
                  <button 
                  onClick={() => addToCart(productId)}
                  className={`bg-gray border-1 py-2.5 px-2.5 border-gray-200 rounded-md`}>
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

        <BlockDetail 
        className='py-2 md:hidden'
        productInfo={product} />

        {/* Supplier info */}
        <SupplierInfo 
        className='mt-1.5 md:mt-0 lg:w-1/4 h-full'
        addToCart={addToCart}
        productId={productId}
        supplierId={supplier._id}
        name={supplier.fullName?.firstName}
        company={supplier.company}
        location={supplier.address}
        verified={true}
        shipping={true}
        /> 
    </div>
  )
}

export default MainContaint