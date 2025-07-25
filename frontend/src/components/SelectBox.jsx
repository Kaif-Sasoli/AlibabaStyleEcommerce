import React, { useState } from 'react'

function SelectBox({
        className='',
        options = []
}) {
  
  const defaultOption = options[0] || 'All Categories'
  const [selectedCategory, setSelectedCategory] = useState(defaultOption)

  const handleChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <div className={`pt-1 ${className}`}>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="focus:outline-none focus:ring-0 px-1 cursor-pointer"
      >
        {options.map((category) => (
          <option key={category} value={category}
          className='cursor-pointer'>
            {category}
          </option>
        ))}
      </select>
           
    </div>
  )
}

export default SelectBox
