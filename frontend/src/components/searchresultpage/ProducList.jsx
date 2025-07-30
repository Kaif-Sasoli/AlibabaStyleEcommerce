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

function ProductList({ className = '', selectedView }) {

  const navigate = useNavigate();
  const [products, setProducts] = useState(searchResultProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10;

  // Update total pages when products change
  useEffect(() => {
    setTotalPages(Math.ceil(products.length / productsPerPage));
  }, [products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div className={`w-full grid gap-3 ${selectedView === 'list' ? 
        'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 md:gap-5'} ${className}`}>
        {currentProducts.map((product, index) => (
          <ProductCard
            key={index}
            view={selectedView}
            {...product}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="my-3 md:mb-16 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className='cursor-pointer'
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              className='cursor-pointer '
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
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
