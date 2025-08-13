import React, { useState } from 'react';

function FloatingInput({
  label,
  id,
  type = 'text',
  name,
  register,
  onFocus,
  error,
  className = '',
  validation = {},
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex relative w-full mb-6 ${className}`}>
      <input
        id={id}
        type={type}
        {...register(name, validation)}
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={() => setIsFocused(false)}
        className={`peer w-full px-3 pt-6 pb-2 border rounded-md bg-white text-sm
           focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' :
          'focus:ring-gray-300'
        }`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
        peer-placeholder-shown:text-gray-400
        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600`}
      >
        {label}
      </label>
      {error && (
        <span className="text-red-500 text-sm mt-1 absolute -bottom-5">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default FloatingInput;
