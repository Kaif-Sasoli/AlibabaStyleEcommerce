import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/sidebar/FilterSidebar';
import Breadcrumbs from '../components/Breadcrumbs'
import ProductToolbar from '@/components/searchresultpage/ProductToolbar';
import ProductList from '../components/searchresultpage/ProducList'
import { searchProducts } from '../services/productService'
import { MoonLoader } from 'react-spinners'
import { SearchSVG } from '../components/SVGs'


export default function SearchResultsPage() {

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [selectedView, setSelectedView] = useState("list");
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

  const breadcrumbPaths = [ 
    { label: "Home", href: "/" },
    { label: "Clothing", href: "/clothing" },
    { label: "Men", href: "/clothing/men" },
    { label: "Accessories", href: "/clothing/men/accessories" },
  ];

     useEffect(() => {
      if (query) {
        fetchProducts();
      }
    }, [query]);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await searchProducts({ q: query, page: 1, limit: 10 });
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

   const filterItems = [
         'Samsung',
         'Apple',
         'Poco',
         'Metallic',
    ]

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

        {loading ? (
          <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
            <MoonLoader size={50} color="#3b82f6" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
            <SearchSVG  size={100} />
            <h2 className="text-lg font-semibold text-gray-800">
              No products found
            </h2>
            <p className="text-gray-500 mt-1">
              We couldn’t find any results for “{query}”.  
              Try checking your spelling or using different keywords.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Refresh Search
            </button>
          </div>
        ) : (
          <ProductList
            className={``}
            selectedView={selectedView}
            paginationData={pagination}
            searchResultProducts={products}
          />
        )}

        </div>

      </div>
    </div>
  )
}

