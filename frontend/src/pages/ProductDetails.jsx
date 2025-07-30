import React from 'react'
import MainContent from '../components/productdetail/MainContent'
import Breadcrumbs from '../components/Breadcrumbs'
import BlockDetail from '../components/productdetail/BlockDetail';
import ProductsContainer from '../components/ProductsContainer'
import Banner from '../components/Banner'
import { searchResultProducts, containerProducts } from '../dummyData';

function ProductDetails() {

  const breadcrumbPaths = [ 
    { label: "Home", href: "/" },
    { label: "Clothing", href: "/clothing" },
    { label: "Men", href: "/clothing/men" },
    { label: "Accessories", href: "/clothing/men/accessories" },
  ];

  return (
    
    <div className='px-0 lg:px-20 pb-14'>
        
         <Breadcrumbs 
         className='py-4 px-3 md:px-0'
         paths={breadcrumbPaths}/>

         {/* Main Contnet   */}
        <MainContent
        supplier={{
            name: "Rahim",
            company: "Guanjoi Trading LLC",
            location: "Pakistan, Karachi",  
            verified: true,
            shipping: true
        }} />

        {/* Block Details */}
        <div className='py-5 w-full flex gap-5'>
        <BlockDetail
        className='hidden md:block w-full order'/>
         
           <ProductsContainer 
               maxItems={4}
               title="You may also like"
               titleClass="px-3"
               products={containerProducts}
               className="hidden md:block rounded-md h-full py-2 bg-white shadow-md   "
               buttonClass="hidden"
               productsDivClass="grid grid-cols-1 "
               productCardProps={{
                 order: 'title-first',
                 titleClass: 'text-sm font-light ',
                 priceClass: 'text-lg font-semibold text-',
                 className: 'flex flex-row px-4 py-1  bg-white rounded-md ',
                 imageClass: 'overflow-hidden flex item-center rounded-lg w-20 h-20  border border-gray-200',
                 infoClass: 'px-2 '
               }}
           />
        </div>

        {/* Related Products */}
         <ProductsContainer 
          maxItems={6}
          title="Related Products"
          titleClass=""
          products={containerProducts}
          className="rounded-md py-2 bg-white shadow-md  px-4"
          buttonClass="hidden"
          productsDivClass="grid grid-cols-6 gap-40 md:gap-10 overflow-x-auto"
          productCardProps={{
            order: 'title-first',
            titleClass: 'text-sm font-light ',
            priceClass: 'text-lg font-semibold text-',
            className: 'w-36 h-52 md:w-auto md:h-auto px-2 md:px-0 py-1 border md:border-none border-gray-200  flex flex-col py-1 bg-white rounded-md bg-blue-200',
            imageClass: 'overflow-hidden flex item-center rounded-lg w-full h-full  md:border border-gray-200',
            infoClass: 'py-2'
          }}
      />

      {/* Banner */}
      <Banner 
      className='hidden md:flex mt-7'/>
    </div>
  )
}

export default ProductDetails