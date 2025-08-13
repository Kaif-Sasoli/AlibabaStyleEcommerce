import React, { useState } from 'react'
import { FaCheck, FaStar, FaTruck, FaUser } from "react-icons/fa6";

function BlockDetail({
      productInfo,
      className = ''
    }) {

    const [activeTab, setActiveTab] = useState('Description')
    const tabs = ['Description', 'Reviews', 'Shipping', 'About seller']

     const details = [
    { label: "Model", value: "#8786867" },
    { label: "Style", value: "Classic style" },
    { label: "Certificate", value: "ISO-898921212" },
    { label: "Size", value: "34mm x 450mm x 19mm" },
  ];

   const features = [
        'Some great feature name here',
        'Lorem ipsum dolor sit amet, consectetur ',
        'Duis aute irure dolor in reprehenderit',
        'Some great feature name here'
   ]

   const reviews = [
    { quote: "Amazing product quality and fast shipping!", author: "Ahmed K." },
    { quote: "Very satisfied. Will buy again!", author: "Fatima R." },
  ];


  return (
    <div className={`md:border rounded-md border-gray-200 bg-white
     ${className}`}>

        {/* div header */}
        <div className='flex pt-2  items-center md:gap-8 border-b border-gray-200  md:px-3'>
        {tabs.map((tab) => (
          <h1
            key={tab}
            className={`cursor-pointer pb-1 px-2 text-textcolor ${
              activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </h1>
        ))}
      </div>

        {/* Disrciption Tab */}
        {activeTab === 'Description' && (details.length > 0 || features.length > 0)  && (
             <div className='  px-4 py-5'>
              {/* Description */}
             <div>
                <p className='text-sm break-words whitespace-normal'>{productInfo.description} </p>
             </div>

              <div className="md:w-3/5  py-6 font-sans">
                <table className="w-full border border-gray-200 rounded-sm  border-spacing-y-2">
                  <tbody>
                    {details.map((item, index) => (
                      <tr key={index} className="border-gray-300 border">
                        <td className="py-1.5 pr-4 px-2  text-textcolor text-sm w-1/3 bg-gray-200">
                          {item.label}:
                        </td>
                        <td className="py-1.5 px-2  text-sm text-gray-800">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className='pb-3'>
                {features && features.map((feature, index) => (
               <li key={index} className="flex items-start gap-2 text-gray-700">
                 <span className="text-textcolor mt-1">
                   <FaCheck />
                 </span>
                 <span>{feature}</span>
               </li>
             ))}           
              </ul>

             </div>
        )}    

        {/* Reviews Tab */}
      {activeTab === 'Reviews' && (
        <div className="px-4 py-6 space-y-5">
          <div className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaStar className="text-yellow-500" /> Customer Reviews
          </div>
            
          {productInfo.reviews && productInfo.reviews.length > 0 ? (
            productInfo.reviews.map((review, index) => (
              <div key={index} className="space-y-3">
                <div className="p-4 bg-gray-50 rounded shadow-sm">
                  <p className="text-sm text-gray-700">{review.quote}</p>
                  <p className="text-xs text-gray-500 mt-1">— {review.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-3">No reviews yet.</p>
          )}
        </div>
      )}

      {/* Shipping Tab */}
      {activeTab === 'Shipping' && (
        <div className="px-4 py-6">
          <div className="flex items-center text-lg font-semibold text-gray-800 gap-2">
            <FaTruck className="text-blue-500" /> Shipping Information
          </div>
          <ul className="list-disc ml-6 mt-4 space-y-1 text-sm text-gray-700">
            <li>Free standard shipping worldwide.</li>
            <li>Dispatched within 2–3 business days.</li>
            <li>Tracking number will be provided via email.</li>
            <li>Expedited shipping options available at checkout.</li>
          </ul>
        </div>
      )}

      {/* About Seller Tab */}
      {activeTab === 'About seller' && (
        <div className="px-4 py-6">
          <div className="flex items-center text-lg font-semibold text-gray-800 gap-2">
            <FaUser className="text-purple-600" /> About the Seller
          </div>
          <div className="mt-4 text-sm text-gray-700 leading-relaxed">
            {productInfo?.supplier?.description}
          </div>
        </div>
      )}     
    </div>
  )
}

export default BlockDetail


 