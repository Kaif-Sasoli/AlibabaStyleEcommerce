import React, { useRef, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { resendEmail } from '../../services/api';
import { verifyEmail } from '../../store/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';

    function VerfiyEmail() {

        const inputsRef = useRef([]);
        const navigate = useNavigate();
        const location = useLocation()
        const dispatch = useDispatch()
        const email = location.state?.email;

        const [timer, setTimer] = useState(10);
        const [otp, setOtp] = useState(new Array(5).fill(''));
        const isVerifying = useSelector(state => state.auth?.loading);
        const [resendAvailable, setResendAvailable] = useState(false);

      // Verify Email 
      const handleVerify = async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length < 5) {
          toast.error('Please enter the complete OTP.');
          return;
        }  
      
       try {
           const resultAction = await dispatch(verifyEmail({ email, otp: fullOtp }));
           if (verifyEmail.fulfilled.match(resultAction)) {
             const { role } = resultAction.payload;
             if (role === 'buyer') {
               toast.success("Sign up successfully")
               navigate('/');
             } else if (role === 'supplier') {
               navigate('/supplier/dashboard');
             } 
           } else {
             toast.error(resultAction.payload?.error || 'Verification failed.');
           }
         } catch (error) {
           toast.error('Verification failed.');
         }
      };

      // Resend Mail again
      const resendCode = async () => {
          try {
            setTimer(10);
            setResendAvailable(false);
            const response = await resendEmail(email);
            toast.success(response)
        } catch (error) {
            toast.error(error);
        }

      }

        useEffect(() => {
          let interval = null;
          if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
          } else {
            setResendAvailable(true);
            clearInterval(interval);
          }
          return () => clearInterval(interval);
        }, [timer]);

        // Redirect back if no email
        useEffect(() => {
          if (!email) {
            navigate('/buyersignup'); 
          }
        }, [email, navigate]);
    
        const handleChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, ''); 
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input
        if (index < 5) {
        inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1].focus();
        }
    };

    const maskEmail = (email) => {
      if (!email) return '';
      const [user, domain] = email.split('@');
      const maskedUser = user.slice(0, 3) + '*'.repeat(Math.max(user.length - 3, 1));
      return `${maskedUser}@${domain}`;
    };

    return (
        <div className='w-full lg:w-5/12 mx-auto mt-10 mb-8 md:px-10 bg-white rounded-md'>

            <div className='flex flex-col md:items-center'>
            <h1 className='text-3xl font-bold mb-6'>
                Verify your email
            </h1>
            <h1 
            className='text-start text-gray-600 font-semibold w-full md:w-auto'>
                We’ve sent an OTP to <span className="font-semibold text-blue-500">{maskEmail(email)}</span>
            </h1>

            <div className="flex gap-3 mt-7">
            {otp.map((value, index) => (
            <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border border-gray-400 rounded text-xl 
                focus:outline-none focus:border-black"
            />
            ))}
        </div>

        <p className="flex items-center gap-2 py-3 text-gray-600 text-sm">
            Didn't receive the code? 
             <p className="py-3 text-gray-600">
          {resendAvailable ? (
            <span 
              className="underline cursor-pointer text-black font-semibold text-base"
              onClick={resendCode}
            >
              Resend code
            </span>
          ) : (
            <p className='text-base'>Get a new one in {timer}s</p>
          )}
        </p>
        </p>
        </div>

        
        <div className='md:px-5 py-10 flex gap-2.5 flex-col'>
            <button
            onClick={handleVerify}
            className="w-full py-3 px-4 bg-[#ff6600] text-white font-semibold rounded-3xl
          hover:bg-orange-500 transition cursor-pointer">
            {isVerifying ? <PulseLoader size={8} color="#fff" /> : "Continue"}
            </button>

            <button
            onClick={() => navigate(-1)}
            className="w-full py-3 px-4 border font-semibold rounded-3xl
            transition cursor-pointer">
            Go back   
            </button>
        </div>
        
        </div>
    )
    }

    export default VerfiyEmail