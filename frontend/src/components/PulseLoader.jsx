import React from 'react';
import { PulseLoader as ReactPulseLoader } from "react-spinners";

function PulseLoader({
  color = "#36d7b7",   
  size = 15,            
  loading = true,        
}) {
  
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div>
      <ReactPulseLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default PulseLoader;
