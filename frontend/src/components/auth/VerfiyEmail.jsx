    import React, { useRef, useState, useEffect } from 'react'
    import { useNavigate } from 'react-router-dom';

    function VerfiyEmail() {

        const [otp, setOtp] = useState(new Array(5).fill(''));
        const inputsRef = useRef([]);
        const navigate = useNavigate();

        const [timer, setTimer] = useState(60);
        const [resendAvailable, setResendAvailable] = useState(false);

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
    
        const resendCode = () => {
          console.log("Resending verification code...");
          setTimer(60);
          setResendAvailable(false);
        };

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

    return (
        <div className='w-full lg:w-5/12 mx-auto mt-10 mb-8 md:px-10 bg-white rounded-md'>

            <div className='flex flex-col md:items-center'>
            <h1 className='text-3xl font-bold mb-6'>
                Verify your email
            </h1>
            <h1 
            className='text-start text-gray-600 font-semibold w-full md:w-auto'>
                kai**@gmail.com
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
            type='submit'
            className="w-full py-3 px-4 bg-[#ff6600] text-white font-semibold rounded-3xl
        hover:bg-orange-500 transition cursor-pointer">
            Continue
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