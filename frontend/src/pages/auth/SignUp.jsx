import React, {useState} from 'react'
import { GoogleSVG, FacebookSVG, LinkedinSVG } from '../../components/SVGs';
import FloatingInput from '../../components/FloatingInput';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { signup } from '../../services/api';

function SignUp() {

    const navigate = useNavigate()
    const location = useLocation();
    const role = location.state?.role;
    const [isLoading, setIsLoading] = useState(false)
    const [showMoreFields, setShowMoreFields] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
    });

    const onSubmit = async (formData) => {
          const data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            role: role,
            password: formData.password,
          };
  
        setIsLoading(true)

        try {  
             await signup(data);
             navigate('/verifyemail', { state: { email: formData.email } });
        } catch (error) {
             setIsLoading(true)
              toast.error(error);
        } finally {
           setIsLoading(false)
        }
      };

        
  return (
    <div className="w-full lg:w-4/12 mx-auto mt-14 lg:mt-10 mb-8 lg:px-6 bg-white  rounded-md">
    
        <h1 className='text-3xl font-semibold mb-6'>
            Create an account
        </h1>

        <div className='flex flex-col gap-5 mb-2'>

             {/* Email */}
                <form 
                onSubmit={handleSubmit(onSubmit)}
                className={`py-2 ${showMoreFields ? 'order-1' : 'order-3'}`}>
                    <FloatingInput 
                    label="Enter an email to create an account"
                    id="email"
                    name="email"
                    type="email"
                    register={register}
                    validation={{ required: 'Email is required' }}
                    error={errors.email}
                    onFocus={() => setShowMoreFields(true)}/>
                    
                    <div className={`transition-all duration-300 
                    ${showMoreFields ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                        <FloatingInput 
                            label="Create a password"
                            id="password"
                            name="password"
                            type="password"
                            register={register}
                            validation={{ required: 'Password is required' }}
                            error={errors.password}
                          />
                       
                       <div className='flex gap-2'>
                         <FloatingInput 
                        label="First Name"
                        id="firstName"
                        name="firstName"
                        type="text"
                        register={register}
                        validation={{ required: 'First name is required' }}
                        error={errors.firstName}
                      />
                      <FloatingInput 
                        label="Last Name"
                        id="lastName"
                        name="lastName"
                        type="text"
                        register={register}
                        validation={{ required: 'Last name is required' }}
                        error={errors.lastName}
                      />
                       </div>
                    </div>
                    <button
                    type='submit'
                    disabled={isLoading}
                    className={`w-full py-3 px-4 text-white font-semibold rounded-3xl
                     transition cursor-pointer ${isValid ? 'bg-[#ff6600] hover:bg-orange-500' : 
                   'bg-[#ffb27f] cursor-not-allowed' }`}>
                    { isLoading ? <PulseLoader size={8} color="#fff"/> : "Continue" }
                  </button>
                </form>
                
                {/* Socail Links */}
                <div  className={`flex ${showMoreFields ? 'order-3 flex-row justify-between' :
                     'order-1 flex-col gap-3'}`}>
                       {/* Google */}
                       <div className={`gap-10 border flex items-center
                         rounded-md transition-all duration-100 hover:bg-gray-200
                        cursor-pointer ${showMoreFields ? 'px-8 py-2 bg-gray-100' : 'px-7 md:px-10 py-2.5'}`}>
                         <GoogleSVG size={28}/> 
                         <h1 className={`text-base font-medium ${showMoreFields ? 'hidden' : 'block'}`}>
                            Continue with Goolge
                        </h1>
                       </div>
                       <div className={` gap-10 border flex items-center
                         rounded-md transition-all duration-100 hover:bg-gray-200
                        cursor-pointer ${showMoreFields ? 'px-8 py-2 bg-gray-100' : 'px-7 md:px-10 py-2.5'}`}>
                         <FacebookSVG size={28} />
                         <h1 className={`text-base font-medium ${showMoreFields ? 'hidden' : 'block'}`}>
                            Continue with Facebook
                        </h1>
                       </div>
                       <div className={`gap-10 border flex items-center
                         rounded-md transition-all duration-100 hover:bg-gray-200
                        cursor-pointer ${showMoreFields ? 'px-7 py-3 bg-gray-100' : 'px-7 md:px-10 py-2.5'}`}>
                           <LinkedinSVG size={31}/>
                           <h1 className={`text-base font-medium ${showMoreFields ? 'hidden' : 'block'}`}>
                            Continue with Linkedin</h1>
                       </div>
                   </div>

                    {/* Line */}
                   <div class={`flex items-center  text-gray-500 font-medium
                    ${showMoreFields ? 'order-2' : 'order-2'}`}>
                      <div class="flex-grow border-t border-gray-300"></div>
                      <span class="mx-3">OR</span>
                      <div class="flex-grow border-t border-gray-300"></div>
                    </div>
                </div>

                <div className=' flex gap-2 justify-start items-center'>
                <h1 className='text-textcolor text-sm'>
                  Already have an account?</h1>
                <button
                onClick={() => navigate('/signin')} 
                className='text-sm font-semibold underline cursor-pointer'>
                    Sign in
                </button>
            </div>
    </div>
  )
}

export default SignUp