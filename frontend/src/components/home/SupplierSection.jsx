import React from 'react'
import AE2x from '../../assets/AE@2x.png'
import AU2x from '../../assets/AU@2x.png'
import US2x from '../../assets/US@2x.png'
import RU2x from '../../assets/RU@2x.png'
import IT2x from '../../assets/IT@2x.png'
import DK2x from '../../assets/DK@2x.png'
import FR2x from '../../assets/FR@2x.png'
import CN2x from '../../assets/CN@2x.png'
import GB2x from '../../assets/GB@2x.png'

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
           <img src={AE2x} alt="Image"
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
           <img src={AU2x} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Australia</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 3 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={US2x} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >United States</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 4 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={RU2x} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Russia</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 5 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={IT2x} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Italy</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>

         {/* Supplier 6 */}
        <div
         className='flex items-center gap-2 px-5 lg:pr-5'>
           <img src={DK2x} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Denmark</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.ae</p>
           </div>
        </div>
        {/* Supplier 6 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={FR2x} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >France</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.com.ar</p>
           </div>
        </div>

        {/* Supplier 7 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={AE2x} alt="Image"
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
           <img src={CN2x} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >China</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.com.cn</p>
           </div>
        </div>

        {/* Supplier 9 */}
        <div
         className='flex items-center gap-2 px-5'>
           <img src={GB2x} alt="Image"
           className='h-6 py-0.5' />
           <div>
            <h1 className='text-sm md:text-base'
            >Great Britain</h1>
            <p className='text-xs md:text-sm leading-2 text-textcolor'>shopname.com.uk</p>
           </div>
        </div>

        </div>
    </section>
  )
}

export default SupplierSection