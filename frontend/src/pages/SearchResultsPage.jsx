import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/sidebar/FilterSidebar';
import Breadcrumbs from '../components/Breadcrumbs'
import ProductToolbar from '@/components/searchresultpage/ProductToolbar';
import ProductList from '../components/searchresultpage/ProducList'
// import ProductList from '../components/ProductList/ProductList';
// import FilterSidebar from '../components/FilterSidebar/FilterSidebar';



export default function SearchResultsPage() {

  const breadcrumbPaths = [ 
    { label: "Home", href: "/" },
    { label: "Clothing", href: "/clothing" },
    { label: "Men", href: "/clothing/men" },
    { label: "Accessories", href: "/clothing/men/accessories" },
  ];

   const filterItems = [
         'Samsung',
         'Apple',
         'Poco',
         'Metallic',
    ]

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [selectedView, setSelectedView] = useState("list");

  return (
    <div className='lg:px-20 py-3 lg:py-0 '>
      <Breadcrumbs  
      paths={breadcrumbPaths}
      className='hidden lg:block pb-1 mb-4 px-3 py-4'/>
      
      <div className='relative w-full flex items-start'>
             
        <FilterSidebar 
        className={`w-32 md:w-1/4 absolute md:static bg-white md:bg-transparent left-2 top-14 
         max-h-36 md:max-h-full overflow-x-scroll md:overflow-x-visible transition-all duration-100
         ${mobileFilterOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-1/6 invisible'}
         md:translate-y-0 md:opacity-100 md:visible`}
         />
             
        <div className='w-full px-2 md:px-8'>
          <ProductToolbar 
         itemCount={12911}
         categoryName="Mobile accessory"
         selectedView={selectedView}
         onViewChange={setSelectedView}
         filterItems={filterItems}
         onMobileFilterToggle={() => setMobileFilterOpen(prev => !prev)}/>

          <ProductList
          className={``}
          selectedView={selectedView}/>
            
        </div>

      </div>
    </div>
  )
}

