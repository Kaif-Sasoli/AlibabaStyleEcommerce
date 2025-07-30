import React from 'react'
import USAFlag from '../../assets/USAFlag.png'

function SupplierSection() {
  return (
    <section className='py-3 pb-5 lg:pb-0 lg:mb-7'>
        <h1 className='mb-4 px-5 text-xl font-medium'>
            Suppliers by region
        </h1>

        <div className='grid grid-cols-2 md:grid-cols-5 gap-5'>
        {/* Supplier 1 */}
        <div
         className='flex items-center gap-2 px-5 lg:pr-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <p className='text-sm md:text-base'
            >Arabic Emirates</p>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 2 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 3 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 4 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 5 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 6 */}
        <div
         className='flex items-center gap-2 px-5 lg:pr-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>
        {/* Supplier 6 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

        {/* Supplier 7 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

        {/* Supplier 8 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

        {/* Supplier 9 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={USAFlag} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Arabic Emirates</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

        </div>
    </section>
  )
}

export default SupplierSection