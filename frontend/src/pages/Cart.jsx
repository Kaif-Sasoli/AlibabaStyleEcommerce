import React, { useState } from 'react'
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


        const dummyCartItems = [
          {
            id: 1,
            name: 'T-shirts with multiple colors, for men and lady',
            details: 'Size: Medium, Color: Blue, Material: Cotton',
            seller: 'Artel Market',
            price: 78.99,
            qty: 1,
            image: TShirt,
          },
          {
            id: 2,
            name: 'Elegant Long Sleeve Shirt',
            details: 'Size: Large, Color: White, Material: Polyester',
            seller: 'Classic Fit',
            price: 89.50,
            qty: 2,
            image: TShirt,
          },
          {
            id: 3,
            name: 'Casual Crew Neck Tee',
            details: 'Size: Small, Color: Black, Material: Linen',
            seller: 'Trendy Styles',
            price: 65.75,
            qty: 1,
            image: TShirt,
          },
        ];

        const paymentMethods = [
          AmericanExpress,
          MasterCard,
          PayPal,
          Visa,
          ApplePay,
        ];

function Cart() {

        const [cartItems, setCartItems] = useState(dummyCartItems);

  return (
    <div className='w-full mt-5 px-3 lg:px-20'>

        {/* Cart Title */}
        <div>
            <h1
            className='text-2xl font-semibold'
            >My cart (3)
            </h1>
        </div>


        {/* Cart Main Section */}
        <div className='w-full flex flex-col md:flex-row gap-5 mt-5'>

            {/* Items Section */}
            <div className='md:w-4/5 '>
           
           <div className='px-5 py-3 bg-white border border-gray-200 
            rounded-md'>

            {/* Item  */}
            {cartItems && cartItems.map((item , index) =>(
            <div className='w-full flex flex-col md:flex-row justify-between border-b 
                     border-gray-200 py-3'>
               
               {/* Left Side */}
               <div className='flex'>
               {/* Image */}
               <div className='w-20 h-20 bg-gray-200 border rounded-sm overflow-hidden border-gray-200'>
                 <img src={TShirt} alt="Image"
                 className='w-full h-full object-cover' />
               </div>

              {/* Details */}
               <div className='-mt-1 pl-3'>
                <h1 className='text-lg'>
                    T-shirts with multiple colors, for men and lady
                </h1>
                <p className='mt-1 text-textcolor'>
                    Size: medium, Color: blue,  Material: Plastic
                </p>
                <p className='text-textcolor'>
                    Seller: Artel Market
                </p>
                
                <div className='hidden md:flex gap-4 py-3'>
                    <button 
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
                    <h1 className='order-2 font-medium text-end'>$78.99</h1>
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
                        setCartItems(prev =>
                          prev.map((cartItem, i) =>
                            i === index ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
                          )
                        )
                      }
                      className='px-1.5 py-1.5 border rounded-tl-md 
                      rounded-bl-md cursor-pointer hover:bg-gray-100 transition-all 
                      duration-100 active:bg-gray-100'>
                        <FaPlus className='text-black' />
                        </button>
                        <input 
                        type="text"
                        value={item.qty } 
                        className='w-14 text-center border text-black border-gray-200 '
                        />
                        <button 
                        onClick={() =>
                          setCartItems(prev =>
                            prev.map((cartItem, i) =>
                              i === index
                                ? { ...cartItem, qty: cartItem.qty > 1 ? cartItem.qty - 1 : 1 }
                                : cartItem
                            )
                          )
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
                    <td className="py-2 text-right text-gray-800">$1403.97</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Discount:</td>
                    <td className="py-2 text-right text-red-500">- $60.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Tax:</td>
                    <td className="py-2 text-right text-green-500">+ $14.00</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 font-semibold text-gray-700">Total:</td>
                    <td className="py-3 text-right font-semibold text-gray-900">$1357.97</td>
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