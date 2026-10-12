import axios from 'axios';
import React, { useEffect } from 'react';
import { IoBagCheckOutline } from 'react-icons/io5';
import { Link, useSearchParams } from 'react-router';

const Payment = () => {
    const [searchParams] =useSearchParams()
    const sessionId = searchParams.get('session_id')
    useEffect(()=>{ 
       if(sessionId) {
        axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {sessionId})
       }
    },[sessionId])
    return (
        <div>
            <div className='flex flex-col justify-center items-center mt-40'>
                 <p className=""><IoBagCheckOutline size={70}/></p>
                 <h2 className='text-3xl font-bold mt-4 mb-4 text-blue-500'>Payment Successfull</h2>
                 <Link to={"/dashboard/transaction"} className="w-full rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition duration-300 hover:from-sky-700 hover:to-cyan-600 disabled:opacity-60">
  
    <span className="text">Go to Your Transaction Page</span>
  
</Link>
            </div>
        </div>
    );
};

export default Payment;