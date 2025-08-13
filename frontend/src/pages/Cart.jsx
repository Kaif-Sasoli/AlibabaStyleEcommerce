import React, { useState, useMemo } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import SavedFroLaterProducts from '../components/SavedFroLaterProducts';
import TShirt from '../assets/TShrit.png'
import AmericanExpress from '../assets/AmericanExpress.png'
import MasterCard from '../assets/MasterCard.png'
import Visa from '../assets/Visa.png'
import ApplePay from '../assets/ApplePay.png'
import PayPal from '../assets/PayPal.png' 
import { containerProducts } from '../dummyData';
import { getCartItems, removeFromCart } from '../services/cartService';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners'

        const paymentMethods = [
          AmericanExpress,
          MasterCard,
          PayPal,
          Visa,
          ApplePay,
        ];

function Cart() {

        const navigate = useNavigate()
        const [cartItems, setCartItems] = useState([]); 
        const [loading, setLoading] = useState(true);      
       
        useEffect(() => {
          const fetchItems = async () =>  {
             try {
                 setLoading(true);
                 const cartItems = await getCartItems()
                 console.log("Cart itmesss ", cartItems)
                 setCartItems(cartItems)
             } catch (error) {
                  toast.error(error)
             } finally {
              setLoading(false); 
             }
          }
           fetchItems()
        }, []);

        const handleRemove = async (productId) => {
          try {
            await removeFromCart(productId);
            setCartItems(prev => ({
              ...prev,
              items: prev.items.filter(item => item.product._id !== productId)
            }));
            toast.success("Product removed from cart");
          } catch (error) {
            toast.error(error || "Failed to remove product");
          }
        };

      const { subtotal, discount, tax, total } = useMemo(() => {
        if (!cartItems?.items) return { subtotal: 0, discount: 0, tax: 0, total: 0 };
              
        const subtotalCalc = cartItems.items.reduce((acc, item) => {
          return acc + (item.product?.price || 0) * (item.quantity || 1);
        }, 0);
      
        const discountCalc = subtotalCalc > 200 ? 20 : 0; // Example: $20 discount if subtotal > 200
        const taxCalc = subtotalCalc * 0.10; // Example: 10% tax
        const totalCalc = subtotalCalc - discountCalc + taxCalc;
      
        return {
          subtotal: subtotalCalc,
          discount: discountCalc,
          tax: taxCalc,
          total: totalCalc
        };
      }, [cartItems]);

      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-[70vh]">
            <MoonLoader color="#3b82f6" size={50} />
          </div>
        );
      }

      if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <h1 className="text-xl font-semibold text-gray-700">Your cart is empty 🛒</h1>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Shopping
            </button>
          </div>
        );
      }

  return (
    <div className='w-full mt-5 px-3 lg:px-20'>

        {/* Cart Title */}
        <div>
            <h1
            className='text-2xl font-semibold'
            >My cart ({cartItems?.items?.length ?? 0})
            </h1>
        </div>


        {/* Cart Main Section */}
        <div className='w-full flex flex-col md:flex-row gap-5 mt-5'>

            {/* Items Section */}
            <div className='md:w-4/5 '>
           
           <div className='px-5 py-3 bg-white border border-gray-200 
            rounded-md'>

            {/* Item  */}
            {cartItems.items && cartItems.items.map((item , index) =>(
              
            <div className='w-full flex flex-col md:flex-row justify-between border-b 
                     border-gray-200 py-3'>
               {console.log("in DiV: ", item.product)}
               {/* Left Side */}
               <div className='flex'>
               
               {/* Image */}
               <div className='w-20 h-20 bg-gray-200 border rounded-sm overflow-hidden border-gray-200 flex-shrink-0'>
                 <img src={item.product?.images[0]} alt="Image"
                 className='w-full h-full object-cover' />
               </div>

              {/* Details */}
               <div className='-mt-1 pl-3'>
                <h1 className='text-lg'>
                   {item.product.title}
                </h1>
              <p className="mt-1 text-textcolor">
                <span className="text-blue-600">
                  Condition: {item.product?.condition ?? "Unknown"}
                </span>
                &nbsp;&nbsp;
                {item.product?.material?.trim() && (
                  <span className="text-green-600">
                    Material: {item.product.material}
                  </span>
                )}
                &nbsp;&nbsp;
                <span className="hidden md:block text-red-600">
                  Warranty: {
                    isNaN(item.product?.warranty) || item.product?.warranty == null
                      ? "No"
                      : item.product.warranty
                  }
                </span>
              </p>
                <p className='text-textcolor'>
                    Seller: {item?.product?.supplier?.company}
                </p>
                
                <div className='hidden md:flex gap-4 py-3'>
                    <button
                    onClick={() => handleRemove(item.product._id)} 
                    className='px-3 py-1 border rounded-md border-gray-300 text-red-500
                    hover:bg-gray-100 active:bg-gray-100 transition-all duration-100'>
                        Remove
                    </button>

                    <button 
                    className='px-3 py-1 border rounded-md border-gray-300 text-blue-500
                    hover:bg-gray-100 active:bg-gray-100 transition-all duration-100'>
                        Save for later
                    </button>
                </div>
               </div>
                </div>

                {/* Right Side */}
                <div className='py-2 md:block flex items-center justify-between'>
                    <h1 className='order-2 font-medium text-end'>${item.product.price}</h1>
                    <div className='hidden order-1 md:flex my-2  px-1 py-1.5 border rounded-md
                     border-gray-200'>
                    <label>Qty:</label>
                    <select name="" id=""
                    className='pr-5 mr-2 focus:outline-0'>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                    </select>
                    </div>
                     {/*  Quantity */}
                    <div className='w-1/3 md:hidden flex text-gray-300'>
                      <button 
                      onClick={() =>
                        setCartItems(prev => ({
                          ...prev,
                          items: prev.items.map((cartItem, i) =>
                            i === index
                              ? { ...cartItem, quantity: cartItem.quantity + 1 }
                              : cartItem
                          )
                        }))
                      }
                      className='px-1.5 py-1.5 border rounded-tl-md 
                      rounded-bl-md cursor-pointer hover:bg-gray-100 transition-all 
                      duration-100 active:bg-gray-100'>
                        <FaPlus className='text-black' />
                        </button>
                        <input 
                        type="text"
                        value={item.quantity} 
                        className='w-14 text-center border text-black border-gray-200 '
                        />
                        <button 
                         onClick={() =>
                           setCartItems(prev => ({
                             ...prev,
                             items: prev.items.map((cartItem, i) =>
                               i === index && cartItem.quantity > 1
                                 ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                 : cartItem
                             )
                           }))
                        }
                        className='px-1.5 py-1.5 border rounded-tr-md 
                        rounded-br-md cursor-pointer hover:bg-gray-100 transition-all 
                        duration-100 active:bg-gray-100'>
                        <FaMinus className='text-black' />
                        </button>
                    </div>
                </div>
            </div>
            ) )}

            <div className='hidden py-5 md:flex items-center justify-between'>
              <button
              onClick={() => navigate(-1)} 
              className='px-2 py-1 flex gap-2 items-center bg-blue-500 text-white 
              rounded-md cursor-pointer hover:bg-blue-600 active:bg-blue-600
              transition-all duration-100'>
                <FaArrowLeftLong  className='mt-1'/>
                back to shop
                </button>
              <button
              className='px-2 py-1 border border-gray-200 rounded-md 
              cursor-pointer hover:bg-gray-100 active:bg-blue-100
              transition-all duration-100'>
                Remove all
                </button>
            </div>
          </div>

            <div className='hidden py-6 md:flex justify-between'>

            {/* Secure Payment */}
              <div className='flex items-center gap-2'>
               <div className='p-2 bg-gray-200 rounded-full hover:bg-gray-300  
               transition-all duration-100'>
                <IoMdLock className='text-2xl text-textcolor' />
               </div>
               <div>
                <h1 className=''>Secure payment</h1>
                <p className='text-textcolor text-sm  '>
                  Have you ever finally just </p>
               </div>
              </div>

               {/* Customer support */}
              <div className='flex items-center gap-2'>
               <div className='p-2 bg-gray-200 rounded-full hover:bg-gray-300  
               transition-all duration-100'>
                <MdMessage className='text-2xl text-textcolor' />
               </div>
               <div>
                <h1 className=''>
                  Customer support
                  </h1>
                <p className='text-textcolor text-sm'>
                  Have you ever finally just  </p>
               </div>
              </div>

               {/* Free delivery */}
              <div className='flex items-center gap-2'>
               <div className='p-2 bg-gray-200 rounded-full hover:bg-gray-300  
               transition-all duration-100'>
                <FaTruck className='text-2xl text-textcolor' />
               </div>
               <div>
                <h1 className=''>Free delivery</h1>
                <p className='text-textcolor text-sm'>
                  Have you ever finally just </p>
               </div>
              </div>

            </div>
            </div>

            {/* Summary */}
            <div className='flex flex-col gap-5 md:w-1/4'>
             
             {/* Coupon */}
             <div className='hidden md:block py-3 px-3 bg-white border border-gray-200 rounded-md'>
                <label >
                    Have a coupon?
                </label>
                <div className='mt-2 flex items-center border border-gray-200
                 rounded-sm'>
                    <input 
                    type="text"
                    placeholder='Add coupon'
                    className='w-3/4 px-2 py-1.5 border-r border-gray-200
                    focus:outline-0' />
                    <button
                    className='px-4 py-1.5 text-blue-500 cursor-pointer hover:bg-gray-100
                    transition-all duration-100 active:bg-gray-100'>
                      Apply
                    </button>
                </div>
             </div>

             {/* Summary div */}
             <div className='py-3 px-3 border border-gray-200 rounded-md bg-white'>
             <table className="w-full">
                <tbody className="">
                  <tr>
                    <td className="py-2 text-gray-600">Subtotal:</td>
                    <td className="py-2 text-right text-gray-800">${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Discount:</td>
                    <td className="py-2 text-right text-red-500">- ${discount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Tax:</td>
                    <td className="py-2 text-right text-green-500">+ ${tax.toFixed(2)}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 font-semibold text-gray-700">Total:</td>
                    <td className="py-3 text-right font-semibold text-gray-900">${total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Checkout */}
              <button className='my-1 w-full py-2 rounded-md text-white bg-[#00B517]
              cursor-pointer hover:bg-green-600 transition-all duration-100'>
                Checkout (3)
                </button>

                {/* Payment */}
                <div className=' py-4 flex items-center justify-center gap-3 overflow-x-auto'>
                 {paymentMethods.map((img, index) => (
                 <img
                   key={index}
                   src={img}
                   alt={`Payment Method ${index + 1}`}
                   className='w-10 h-6 object-contain border px-0.5 py-0.5 rounded-sm
                  border-gray-200 cursor-pointer hover:bg-gray-100'
                 />
               ))}
                </div>
             </div>

            </div>

        </div>
           
           <SavedFroLaterProducts
           products={containerProducts}
             /> 

    </div>
  )
}

export default Cart