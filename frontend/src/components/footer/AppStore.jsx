import React from 'react';

function AppStore({ 
    title = 'Download on the', 
    title2 = 'App Store', 
    svg, 
    className = '', 
    ...props }) {
  return (
    <a
      href="#"
      className={`flex items-center justify-center gap-1 bg-black text-white py-1 
        rounded-lg hover:opacity-90 hover:bg-black/90 transition-all duration-150
        ${className}`}
      {...props}
    >
      <div className="">{svg}</div>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px]">{title}</span>
        <span className="text- font-semibold">{title2}</span>
      </div>
    </a>
  );
}

export default AppStore;
