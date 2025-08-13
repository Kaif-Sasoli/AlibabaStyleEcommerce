import React from 'react';

function TimerBox({ value = "00", label = "Label" }) {
  return (
    <div className="bg-[#606060] text-white text-center rounded-sm
     w-9 md:w-10 h-10 flex flex-col justify-center items-center">
      <p 
       className="text-sm font-semibold leading-tight m-0">
        {value}
      </p>
      <span className="text-[10px] leading-none mt-1">{label}</span>

    </div>
  );
}

export default TimerBox;
