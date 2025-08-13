import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Toaster() {

     const notify = () => toast('Wow so easy !');
        
  return (
    <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <Button onClick={notify}>Notify !</Button>
      <ToastContainer />
    </div>
  )
}

export default Toaster