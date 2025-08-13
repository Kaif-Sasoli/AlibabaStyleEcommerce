import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardSidebar from '../components/sidebar/Sidebar'
import ItemsSection from '../components/home/ItemsSection'
import MainSection from '../components/home/MainSection'
import Section_Sale from '../components/home/SaleSection'
import BannerBoard from '../assets/Banner-board.png'
import Avatar from '../assets/Avatar2.png'
import Group969 from '../assets/Group 969.png'
import Group570 from '../assets/Group570.png'
import InquirySection from '../components/home/InquirySection'
import ExtraService from '../components/home/ExtraService'
import { products, items, recommededProducts } from '../dummyData'
import ProductsContainer from '../components/ProductsContainer'
import { IoIosSearch } from "react-icons/io";
import  Containers  from '../assets/Containers.png'
import SupplierSection from '../components/home/SupplierSection'
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners'
import { recommendedProducts, getElectronicProducts, getCategories } from '../services/productService'


function Home() {

    const [recommended, setRecommended] = useState([])
    const [categories, setCategories] = useState([]);
    const [electronicProductsData, setElectronicProductsData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchData  = async () => {
        setLoading(true)
        try {
          const [categoriesItems, recommendedProductsData, electronicProductsData] = await Promise.all([
            getCategories(),
            recommendedProducts(),
            getElectronicProducts(),
          ]);

          setCategories(categoriesItems);
          setRecommended(recommendedProductsData);
          setElectronicProductsData(electronicProductsData);
          
        } catch (error) {
          toast.error(error || "Failed to load products")
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader size={50} color="#3b82f6" />
      </div>
    )
  }

    const service = [
      {
        image: Containers,
        icon: IoIosSearch,
        serviceName: "Source from Industry Hubs"
      },

       {
        image: Containers,
        icon: IoIosSearch,
        serviceName: "Source from Industry Hubs"
      },

       {
        image: Containers,
        icon: IoIosSearch,
        serviceName: "Source from Industry Hubs"
      },

       {
        image: Containers,
        icon: IoIosSearch,
        serviceName: "Source from Industry Hubs"
      },

   ]

  return (
    <div className='w-full lg:px-24 lg:py-2'>

      {/* Main Section */}
        <MainSection categories={categories}
                    bannerData={{
                      title: 'Electronic items',
                      subtitle: 'Latest trending',
                      buttonText: 'Learn more',
                      image: BannerBoard,
                    }} 
                    user={{
                      name: 'Kaif',  
                      avatar: Avatar,
                    }}/>
      
       <Section_Sale
                  title="Deals and offers"
                  subTitle="Hygiene equipments"
                  timer={{
                    days: '04',
                    hours: '13',
                    minutes: '34',
                    seconds: '56'
                  }}
                  products={products}
        />

       <ItemsSection
                   bannerData={{
                     title: "Home and outdoor",
                     image: Group969,
                     buttonText: "Source"
                   }}
                   items={items}/> 

          <ItemsSection
                   bannerData={{
                     title: "Consumer electronics and gadgets",
                     image: Group570,
                     buttonText: "Source"
                   }}
                   items={electronicProductsData}/> 

          {/* Inquriy Section */}
          <InquirySection/>

            {/* Recomended Items */}
             <ProductsContainer 
              maxItems={100}
              title="Recommended items"
              titleClass=""
              products={recommended}
              className="rounded-md py-2 px-3 md:px-0"
              buttonClass="hidden"
              productsDivClass="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-4"
              productCardProps={{
                order: 'title-first',
                titleClass: 'text-sm font-light ',
                priceClass: 'text-lg font-semibold',
                className: 'bg-green-300 w-full md:w-full md:h-auto  py-1 border border-gray-200  flex flex-col py-1 bg-white rounded-md shadow-md',
                imageClass: 'p-2 flex item-center rounded-lg w-36 h-36 lg:w-48 lg:h-48 mx-auto overflow-hidden',
                infoClass: 'py-2 px-3'
              }}
           />

          {/* Extra Services Section */}
          <ExtraService/>

          {/* Suppliers Section */}
          <SupplierSection/>
      
    </div>
  )
}

export default Home