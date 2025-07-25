import React from 'react'
import FooterColumn from './FooterColumn'
import AppStore from './AppStore'
import Logo from '../Logo'
import IconWrapper from '../IconWrapper'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";


function TopFooter() {

    const macSVG = (<svg 
                width="25px" 
                height="30px"
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg" 
                version="1.1">
                <path 
                style={{ fill: '#FFFFFF', stroke: '#FFFFFF' }}
                 d="M 86,35 C 79,25 65,25 58,28 51,31 48,30 41,27 28,22 14,33 12,45 c -4,20 5,37 12,44 7,7 10,9 19,6 6,-2 10,-5 17,-1 5,3 11,4 18,-4 C 85,82 87,79 89,72 70,64 75,40 86,35 z M 49,27 C 49,16 58,6 68,5 68,19 57,27 49,27 z"/>
                 </svg>);

    const playStoreSVG = (
                    <svg 
                    width="25px" 
                    height="25px" 
                    viewBox="0 0 64 64" 
                    xmlns="http://www.w3.org/2000/svg" 
                    stroke-width="3" stroke="#000000" 
                    fill="none">
                    <path
                    style={{ fill: '#FFFFFF', stroke: '#FFFFFF' }}
                    d="M12.36,53.33V10.67a1,1,0,0,1,1.56-.91L51.11,31a1,1,0,0,1,0,1.81L13.93,54.24A1.05,1.05,0,0,1,12.36,53.33Z"/><line x1="12.36" y1="10.67" x2="42.07" y2="38.02"/><line x1="12.36" y1="53.33" x2="41.24" y2="25.35"/></svg>
                    );

        const socialIcons = (
            <div className='w-full flex justify-center lg:justify-start gap-5 lg:gap-1'>
                <IconWrapper 
                Icon={FaFacebookF}
                href={""}
                iconClassName='bg-gray-400 w-6 h-6 p-1 text-white rounded-full 
                hover:bg-gray-500 transition-all duation-150 active:bg-gray-500'/>
                <IconWrapper 
                Icon={FaXTwitter}
                href={""}
                iconClassName="bg-gray-400 w-6 h-6 p-1 text-white rounded-full 
                hover:bg-gray-500 transition-all duation-150 active:bg-gray-500"/>
                <IconWrapper 
                Icon={FaLinkedinIn}
                href={""}
                iconClassName="bg-gray-400 w-6 h-6 p-1 text-white rounded-full 
                hover:bg-gray-500 transition-all duation-150 active:bg-gray-500"/>
                <IconWrapper 
                Icon={FaInstagram}
                href={""}
                iconClassName="bg-gray-400 w-6 h-6 p-1 text-white rounded-full 
                hover:bg-gray-500 transition-all duation-150 active:bg-gray-500"/>
                <IconWrapper 
                Icon={FaYoutube}
                href={""}
                iconClassName="bg-gray-400 w-6 h-6 p-1 text-white rounded-full 
                hover:bg-gray-500 transition-all duation-150 active:bg-gray-500"/>
            </div>
        )
    
  return (
    <div className='w-full flex flex-col lg:flex-row items-center gap-5 
    pb-4 pt-2 md:pb-0 lg:px-20 px-4'>
        
            <div className='w-full lg:max-w-72 flex flex-col gap-3'>
            <Logo/>
            <p className='hidden lg:block text-sm tracking-tighter'>
                Best information about company gives but 
                now lorem ipsum is
            </p>
            {/* Social icons block */}
             <div className="hidden lg:flex">{socialIcons}</div>
            </div>
            

        <div className="w-full lg:grid grid-cols-1 md:grid-cols-5 gap-5 lg:px-5 ">    
            <FooterColumn title="About" items={['About Us', 'Find store', 'Categories', 'Blogs']} />
            <FooterColumn title="Partnership" items={['About Us', 'Find store', 'Categories', 'Blogs']} />
            <FooterColumn title="Information" items={['Help Center', 'Money Refund', 'Shipping', 'Contact us']} />
            <FooterColumn title="For Users" items={['Login', 'Register', 'Settings', 'My Orders']} />
            <FooterColumn title="Get App" 
            className='w-34 hidden md:block'

            items={[
                    <AppStore svg={macSVG}/>,
                    <AppStore svg={playStoreSVG} title='Get it on' title2='Google Play'/>
            ] }/>
        </div>

         {/* Social icons block for mobile only */}
           <div className="w-full flex lg:hidden justify-center">
           {socialIcons}
        </div>
    </div>
  )
}

export default TopFooter