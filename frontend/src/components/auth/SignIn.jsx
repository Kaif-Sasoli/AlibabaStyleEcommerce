import React from 'react'
import FloatingInput from './FloatingInput'
import { useForm } from 'react-hook-form'
import { GoogleSVG, FacebookSVG, LinkedinSVG } from '../SVGs';
import { useNavigate } from 'react-router-dom';


function SignIn() {

        const navigate = useNavigate()

        const {
          register,
          handleSubmit,
          formState: { errors, isValid },
        } = useForm();

        const onSubmit = (data) => {
          console.log('Login data:', data);
        };

  return (
   
     <div className="w-full lg:w-1/3  mx-auto mt-16 lg:mt-10 mb-8 lg:p-6 rounded-md">

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Sign in
      </h2>
        
        <form  onSubmit={onSubmit}>
           <FloatingInput
          label="Email address"
          id="email"
          name="email"
          type="email"
          register={register}
          validation={{ required: 'Email is required' }}
          error={errors.email}
        />
        {/* Passowrd */}
         <FloatingInput
          label="Password"
          id="password"
          name="password"
          type="password"
          register={register}
          validation={{ required: 'Password is required' }}
          error={errors.password}
        />

        <button
          type="submit"
            className={`w-full py-3 px-4 bg-[#ff6600] text-white font-semibold rounded-3xl
               transition cursor-pointer ${isValid ? 'bg-[#ff6600] hover:bg-orange-500' : 
                'bg-[#ffb27f] cursor-not-allowed' }`}>
          Login
        </button>

       <div className='flex justify-end py-5'>
         <button
        className='text-sm underline leading-1 font-medium cursor-pointer'>
             Forgot password?
        </button>
       </div>
        </form>

        <div class="flex items-center  text-gray-500 font-medium">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-3">OR</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <div className='flex justify-center gap-5 py-2.5'>
            {/* Google */}
            <div className='w-24 h-13 bg-gray-100 flex items-center
             justify-center rounded transition-all duration-100 hover:bg-gray-200
             cursor-pointer'>
              <GoogleSVG size={28}/> 
            </div>
            <div className='w-24 h-13 bg-gray-100 flex items-center 
            justify-center rounded  transition-all duration-100 hover:bg-gray-200
             cursor-pointer'>
              <FacebookSVG size={28} />
            </div>
            <div className='w-24 h-13 bg-gray-100 flex items-center 
            justify-center rounded  transition-all duration-100 hover:bg-gray-200
             cursor-pointer'>
                <LinkedinSVG size={31}/>
            </div>
        </div>

        <div className=' flex gap-2 py-1.5'>
            <h1 className='text-textcolor text-sm'>New to Alibaba.com?</h1>
            <button
            onClick={() => navigate('/accounttype')} 
            className='text-sm font-semibold underline cursor-pointer'>
                Create an account
            </button>
        </div>

    </div>
  )
}

export default SignIn