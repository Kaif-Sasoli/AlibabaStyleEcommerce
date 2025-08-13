import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { searchResultProducts, containerProducts } from '../../dummyData';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/ui/pagination";
import ProductsContainer from '../ProductsContainer';

function ProductList({ 
  paginationData, 
  searchResultProducts = [], 
  className = '', 
  selectedView, 
  onPageChange 
}) {
  
  const { page = 1, pages = 1 } = paginationData || {};


  return (
    <>
      <div className={`w-full grid gap-3 ${selectedView === 'list' ? 
        'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 md:gap-5'} ${className}`}>
        {searchResultProducts.map((product, index) => (
          <ProductCard
            key={product._id || index}
            view={selectedView}
            product={product}
            
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="my-3 md:mb-16 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className='cursor-pointer'
              onClick={() => page > 1 && onPageChange(page - 1)}
            />
          </PaginationItem>

          {[...Array(pages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                 isActive={page === index + 1}
                 onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              className='cursor-pointer '
              onClick={() => page < pages && onPageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>


      
        
      <ProductsContainer 
        maxItems={5}
        title="You may also like"
        products={containerProducts}
        className="w-full mt-5 md:hidden"
        buttonClass="hidden"
        titleClass=""
        productsDivClass="grid grid-cols-5 gap-44 overflow-x-scroll "
        productCardProps={{
          order: 'price-first',
          titleClass: 'text-sm font-light ',
          priceClass: 'text-lg font-semibold text-',
          className: 'w-40 px-4 py-2 border-[1px] border-gray-200 bg-white rounded-md shadow-md hover:shadow-2xl shadow-gray-200',
          imageClass: 'flex item-center rounded-lg pl-3 w-28 h-28',
          infoClass: ''
        }}
      />
        
    </>

      
  );
}

export default ProductList;
