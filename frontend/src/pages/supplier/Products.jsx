import React, { useState, useEffect } from 'react'
import { FaBars } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/supplier_dashboard/ProductCard';
// import { searchResultProducts, containerProducts } from '../../dummyData';
import { getProducts } from '../../services/productService';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../../components/ui/pagination";

function Products({ className}) {

      const navigate = useNavigate()
      const [selectedView, setSelectView] = useState('list')
      const [products, setProducts] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [loading, setLoading] = useState(false); 
      const productsPerPage = 10;
  

      useEffect(() => {
        const fetchProducts = async () => {
           setLoading(true); 
          try {
            const data = await getProducts(currentPage, productsPerPage);
              setProducts(data.products || []);
              setTotalPages(data.totalPages || 1);
              console.log(data.products)
          } catch (err) {
            toast.error(err?.response?.data?.error || err.message || "Failed to fetch products");
          } finally {
        setLoading(false); 
      }
        };
        fetchProducts();
      }, [currentPage, productsPerPage]);
      
      const handlePageChange = (page) => setCurrentPage(page);


  return (
    <div className={`mt-24 mx-2 lg:mx-10 rounded-xl  ${className}`}>

        {/* View switch */}
        <div className='flex justify-between px-5 py-5'>
           <button 
            onClick={() => navigate('/supplier/add-product')}
           className='py-1 px-2 bg-blue-500 text-white
           rounded-md cursor-pointer hover:to-blue-600'>
            Add Product
            </button>
          <div className='flex'>
          <div className={`px-1.5 py-1.5 border rounded-tl-sm rounded-bl-sm text-xl border-gray-200  
            ${selectedView === 'grid' ? 'bg-gray-200' : ''}`}
            onClick={() => setSelectView('grid')}>
            <IoGrid className='active:scale-95 transition-all duration-200 cursor-pointer' />
          </div>    
          <div className={`px-1.5 py-1.5 border rounded-tr-sm rounded-br-sm text-xl border-gray-200
            ${selectedView === 'list' ? 'bg-gray-200' : ''}`}
            onClick={() => setSelectView('list')}>
            <FaBars className='active:scale-95 transition-all duration-200 cursor-pointer' />
          </div>
          </div>
        </div>
        
       {/* Loader or Products */}
      {loading ? (
        <div className="flex justify-center items-center py-40">
          <MoonLoader size={50} color="#3b82f6" />
        </div>
      ) : (
        <div className={`w-full grid gap-3 ${selectedView === 'list'
          ? 'grid-cols-1'
          : 'grid-cols-2 md:grid-cols-4 md:gap-5'} ${className}`}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              view={selectedView}
              images={Array.isArray(product.images)
                ? product.images
                : product.images  
                  ? [product.images]
                  : ["/placeholder.png"]}
              title={product.title}
              orders={product.totalOrders}
              inStock={product.quantity}
              price={product.price}
              discount={product.discount}
              description={product.description}
              shipping={product.freeShipping}
              onDeleteSuccess={(deletedId) => {
                setProducts(prev => prev.filter(p => p._id !== deletedId));
              }}
            />
          ))}
        </div>
      )}

        {/* Pagination */}
        {!loading && (
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
        )}
    </div>
  )
}

export default Products