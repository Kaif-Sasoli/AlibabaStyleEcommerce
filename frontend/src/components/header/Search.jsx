import React from 'react'
import SelectBox from '../SelectBox'
import Icon from '../IconWrapper'
import { IoMdSearch } from "react-icons/io";

function Search({
  className='',
  ...props


}) {

    const categoryList = [
      'All Categories',
      'Electronics',
      'Clothing',
      'Groceries',
      'Furniture',
    ]

  return (
    
    <div 
    className={`flex border-2 border-secondary rounded-md 
    hover:outline-1 outline-blue-600 ${className}`}>
        <label 
        className='lg:hidden text-xl pl-1 py-1.5 text-textcolor'>
          <Icon Icon={IoMdSearch} />
        </label>
        {/* Input */}
        <input 
        type="text"
        placeholder='Search' 
        className='w-full lg:border-r-2 px-2 lg:py-1 border-secondary text-textcolor
        focus:outline-none focus:ring-0 ' />

        {/* Select  */}
        <SelectBox 
         options={categoryList} 
         className='px-1 hidden lg:block'/>
       
       {/* Button */}
        <button 
        className='hidden lg:block lg px-4 bg-secondary text-white cursor-pointer 
        transition-all duration-150 hover:bg-blue-700 active:bg-blue-700'>
          Search
        </button>
    </div>
  )
}

export default Search