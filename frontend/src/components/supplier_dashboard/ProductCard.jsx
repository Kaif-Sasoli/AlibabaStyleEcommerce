import React from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { useNavigate } from 'react-router-dom'
import { confirmToast } from '../ConfirmToast';
import { deleteProduct } from '../../services/productService';
import { toast } from 'react-toastify';
function ProductCard({
    productId,
    view,
    images,
    title,
    price,
    discount,
    rating,
    orders,
    inStock,
    shipping,
    description,
    onDeleteSuccess,
    className=''
}) {

     const navigate = useNavigate()

     const handleDelete = () => {
       confirmToast("Are you sure you want to delete this product?", () => {
         deleteProduct(productId)
           .then(() => {
              toast.success("Product deleted");
              if (onDeleteSuccess) onDeleteSuccess(productId);
            })
           .catch((err) =>
             toast.error(err || "Error deleting product")
           );
       });
     };

   
  return (
            <div 
            onClick={() => { navigate(`/product/${productId}`) }}
            className={`w-full border-[1px] border-gray-200 p-2 rounded-md flex gap-4  cursor-pointer
            bg-white shadow-md ${view === 'grid' ? 'flex-col' : 'flex-row'} ${className}`}>
        
              {/* Image */}
              <div className={`flex items-center justify-center flex-shrink-0 overflow-hidden
              ${view === 'grid' ? 'lg:w-40 lg:h-40 mx-auto' : 'w-20 md:w-28 md:h-28 md:mx-3'}`}>
               {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={images?.[0] || "/placeholder.png"}
                    alt={`${title}-${idx}`}
                    className="w-full h-full "
                  />
                ))}
              
              </div>
        
               {/* Content */}
              <div className="w-full md:flex-1">
        
                <div className={`w-full flex justify-between items-start`}>
                  <h2 className={`font-medium md:text-base  
                    ${view === 'grid' ? 'text-[14px] break-words text-textcolor' : 'text-[14px] md:text-base'}`}>
                        {title}
                 </h2>
                 <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="bg-gray border-1 border-gray-200 rounded-md px-1.5 py-1.5"
                >
                  <GoTrash className="text-sm text-red-500 cursor-pointer" />
                </button>
                
                </div>
        
                <div className={`  `}>
                {/* Pricing */}
                <div className="mt-1 flex items-center gap-2">
                  <p className={`text-lg font-semibold ${view === 'grid' ? 'text-base' : 'text-lg'}`}>
                    ${price}</p>
                 {discount > 0 && (
                  <p
                    className={`text-sm rounded-2xl px-2 ${
                      discount >= 50
                        ? "text-gray-500"       
                        : discount >= 20
                        ? "text-orange-500"    
                        : "text-green-400"     
                    }`}
                  >
                    {discount}%
                  </p>
                )}
                </div>
                   
               <div
                  className={`flex items-center pt-1 ${
                    view === "grid" ? "justify-between" : "gap-3"
                  }`}
                >
                  <p
                    className={`text-xs rounded-xl px-2 py-0.5 ${
                      inStock > 10
                        ? "bg-green-200 text-green-800"   // Plenty in stock
                        : inStock > 0
                        ? "bg-yellow-200 text-yellow-800" // Low stock
                        : "bg-red-200 text-red-800"       // Out of stock
                    }`}
                  >
                    In Stock: {inStock}
                  </p>
                  
                  {shipping && (
                    <span className="text-xs bg-blue-200 text-blue-800 rounded-xl px-2 py-0.5">
                      Free shipping
                    </span>
                  )}
                </div>
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