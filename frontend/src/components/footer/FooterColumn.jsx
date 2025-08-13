import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";

const FooterColumn = ({ title, items, className='' }) => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b-[1px] border-gray-400 md:border-none ${className}`}>
     
     {/* Title */}
      <div
      className='flex justify-between items-center cursor-pointer py-2 md:py-0 
      transition-all duration-100'
      onClick={() => setIsOpen(!isOpen)}>
        
        <h4 className="text-sm md:text-base font-semibold">{title}</h4>
        {/* Arrow */}
        <span className='lg:hidden'>
             {isOpen ?  <FaChevronUp/> : <FaAngleDown/>}
        </span>
      </div>

      {/* Item List */}
      <ul className={`overflow-hidden transition-all duration-300 ease-in-out  
       md:!block md:!max-h-none md:!opacity-100 md:py-4
      ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        {items.map((item, i) => (
          <li key={i} className="pl-2 md:pl-0 py-0.5 mb-2 md:mb-1 
          hover:text-black cursor-pointer">
            {item}
            </li>
        ))} 
      </ul>
    </div>
  );
};

export default FooterColumn;