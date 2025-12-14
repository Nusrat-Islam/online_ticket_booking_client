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
                 <Link to={"/transaction"} className="btn">
  <div className="wrapper">
    <div className="flower flower1"><div className="petal"></div><div className="petal two"></div></div>
    <div className="flower flower2"><div className="petal"></div><div className="petal three"></div></div>
    <div className="flower flower3"><div className="petal"></div><div className="petal four"></div></div>
    <div className="flower flower4"><div className="petal"></div><div className="petal two"></div></div>
    <div className="flower flower5"><div className="petal"></div><div className="petal three"></div></div>
    <div className="flower flower6"><div className="petal"></div><div className="petal four"></div></div>
    <span className="text">Go to Your Transaction Page</span>
  </div>
</Link>
            </div>
        </div>
    );
};

export default Payment;