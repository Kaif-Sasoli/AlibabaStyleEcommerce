import { useEffect, useState } from 'react'
import SelectBox from '../SelectBox'
import { FaBars } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import FlagDropdown from './FlagDropdown';

function LowerHeader({
  className='',
  ...props

}) {

  const options = ["Help"]
  const currencies = ["USD", "EUR", "PKR", ]
   const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
         .then(res => res.json())
         .then(data => {
              const countryData = data.map(country => ({
                name: country.name.common,
                flag: country.flags?.png
              })).sort((a, b) => a.name.localeCompare(b.name));

               setCountries(countryData);
               const defaultCountry = countryData.find(c => c.name === "Pakistan");
               setSelectedCountry(defaultCountry?.name || countryData[0]?.name || "");
         })
  }, [])
  

  return (
    <nav 
      className={`lg:border-b-[1px] lg:border-t-[1px] py-3 pb-4 lg:pb-3 lg:py-1.5 border-textcolor 
      flex items-center justify-between ${className}`}>

       <ul className={`w-full flex items-center gap-1 justify-center 
        lg:justify-normal lg:gap-3 text-sm `}>
          <li>
              <FaBars
              className='hidden lg:block hover:scale-105'/>
          </li>
          <li>
             <Link
                to="#"
                className="bg-gray-200 lg:bg-transparent text-secondary 
                lg:text-current rounded-sm p-1 active:bg-gray-300 transition-all
                duration-100 lg:active:bg-transparent lg:hover:bg-gray-100">
                  All Category
             </Link>
          </li>

          <li>
             <Link
                to="#"
                className="hidden lg:block bg-gray-200 lg:bg-transparent text-secondary 
                lg:text-current rounded-sm p-1 active:bg-gray-300 transition-all
                duration-100 lg:active:bg-transparent lg:hover:bg-gray-100">
                  Hot Offers
             </Link>
          </li>
          <li>
             <Link
                to="#"
                className="bg-gray-200 lg:bg-transparent text-secondary 
                lg:text-current rounded-sm p-1 active:bg-gray-300 transition-all
                duration-100 lg:active:bg-transparent lg:hover:bg-gray-100">
                  Gift boxes
             </Link>
          </li>
          <li>
             <Link
                to="#"
                className="bg-gray-200 lg:bg-transparent text-secondary 
                lg:text-current rounded-sm p-1 active:bg-gray-300 transition-all
                duration-100 lg:active:bg-transparent lg:hover:bg-gray-100">
                  Projects
             </Link>
          </li>

          <li>
             <Link
                to="#"
                className="bg-gray-200 lg:bg-transparent text-secondary 
                lg:text-current rounded-sm p-1 active:bg-gray-300 transition-all
                duration-100 lg:active:bg-transparent lg:hover:bg-gray-100
                ">
                  Menu Items
             </Link>
          </li>
          <li className='hidden lg:block active:bg-gray-300 transition-all
                duration-100 lg:active:bg-transparent lg:hover:bg-gray-100
                rounded-sm'>
              <SelectBox 
              options={options}
              className="text-xm py-1"/>
          </li>
       </ul>

     <div 
        className='w-fit hidden lg:flex items-center gap-2 text-sm '>
        <div 
          className='flex items-center justify-center'>
            <h3>English</h3>
             <SelectBox
             className='pb-0.5 active:bg-gray-300 transition-all
                duration-100 lg:hover:bg-gray-100 rounded-sm'
             options={currencies}/>
       </div>
        <div className=' flex items-center text-sm w-28'>
          <span>Ship to</span>
           <FlagDropdown
          countries={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
        </div>

     </div>
    </nav>
  )
}

export default LowerHeader