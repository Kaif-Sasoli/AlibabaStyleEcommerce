import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { MdOutlineSort } from "react-icons/md";

function ProductToolbar({
  itemCount = 0,
  categoryName = 'All',
  selectedView,
  onViewChange,
  filterItems = [],
  onMobileFilterToggle,
  onSortChange
}) {
  const sortOptions = ['Newest', 'Oldest', 'Name', 'Top Rated'];
  const [activeFilters, setActiveFilters] = useState(filterItems);
  const [currentIndex, setCurrentIndex] = useState(0);

  const removeFilter = (filterToRemove) => {
    setActiveFilters(prev => prev.filter(item => item !== filterToRemove));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const handleSortClick = () => {
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    setCurrentIndex(nextIndex);
    onSortChange?.(sortOptions[nextIndex]);
  };

  return (
    <div className={`w-full items-center ${activeFilters.length > 0 ? 'mb-0' : 'mb-2'}`}>
      
      {/* Toolbar Top */}
      <div className="w-full px-2.5 py-2 flex justify-between items-center bg-white 
        rounded-sm border border-gray-200">

        {/* Item Count */}
        <div className='hidden md:block'>
          <p>{itemCount} items in <span className='font-medium'>{categoryName}</span></p>
        </div>

        {/* Filters + View Switch */}
        <div className='w-full md:w-auto flex gap-1 md:gap-3 items-center'>

          {/* Verified checkbox */}
          <div className='hidden md:flex items-center gap-1.5'>
            <input type="checkbox" className='w-4 h-4 rounded-md bg-blue-500' />
            <label>Verified only</label>
          </div>

          {/* Sort dropdown desktop */}
          <select className='hidden md:block px-3 py-1 border border-gray-200 rounded-sm'>
            <option value="">Featured</option>
          </select>

          {/* Filter mobile button */}
          <div onClick={onMobileFilterToggle}
            className='md:hidden w-2/4 px-2 py-1 flex justify-between items-center border border-gray-200 rounded-sm'>
            <button>Filter ({activeFilters.length})</button>
            <FiFilter className='mt-1' />
          </div>

          {/* Sort mobile button */}
          <div onClick={handleSortClick}
            className='md:hidden w-2/3 px-0.5 py-1 flex justify-between items-center border border-gray-200 rounded-sm'>
            <button>Sort: {sortOptions[currentIndex]}</button>
            <MdOutlineSort className='mt-1 text-xl' />
          </div>

          {/* View switch */}
          <div className='flex'>
            <div className={`px-1.5 py-1.5 border rounded-tl-sm rounded-bl-sm text-xl border-gray-200  
              ${selectedView === 'grid' ? 'bg-gray-200' : ''}`}
              onClick={() => onViewChange('grid')}>
              <IoGrid className='active:scale-95 transition-all duration-200' />
            </div>

            <div className={`px-1.5 py-1.5 border rounded-tr-sm rounded-br-sm text-xl border-gray-200
              ${selectedView === 'list' ? 'bg-gray-200' : ''}`}
              onClick={() => onViewChange('list')}>
              <FaBars className='active:scale-95 transition-all duration-200' />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className='flex items-center py-3 gap-5 flex-wrap'>
          <div className='flex items-center gap-2 flex-wrap'>
            {activeFilters.map((item, index) => (
              <button key={index} onClick={() => removeFilter(item)}
                className='pl-2 pr-0.5 py-0.5 text-sm bg-white border border-blue-400 
                rounded-md flex items-center justify-between text-textcolor'>
                {item}
                <IoClose className='ml-1 pt-1 text-xl' />
              </button>
            ))}
          </div>
          <button onClick={clearAllFilters} className='text-blue-500 text-sm'>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductToolbar;
