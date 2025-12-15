import {  Plane } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const LatestCard = ({ticket}) => {
    return (
        <div>
     <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg shadow-blue-400 border overflow-hidden p-4">

      {/* CARD CONTENT */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT SECTION */}
        <div className="md:w-3/4 flex gap-5 p-5 relative bg-[#F5F9FF] rounded-xl">

          {/* Ticket Image */}
          <img
            src={ticket.image}
            alt="ticket"
            className="w-36 h-36 object-cover rounded-lg border"
          />

          <div className="flex flex-col justify-between w-full">

            {/* Ticket Title */}
            <h2 className="text-xl font-bold text-gray-900">{ticket.title}</h2>

          

            {/* Transport Type */}
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
              <Plane size={20} /> {ticket.transport}
            </p>

            {/* Perks */}
            <div className="flex flex-wrap gap-2 mt-2">
              Perks:
              {ticket.perks?.map((perk, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                 {perk}
                </span>
              ))}
            </div>

            {/* Vertical dashed divider */}
            <div className="absolute -right-6 top-5 bottom-5 w-[2px] border-r-2 border-dashed border-blue-300"></div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:w-3/9 p-4 bg-[#EBF3FF] flex flex-col justify-between rounded-xl">

        {/* Price & Quantity */}
        <div>
            <p className="text-sm text-gray-500">Price (per unit)</p>
            <p className="text-2xl font-bold text-blue-700">USD {ticket.price}</p>

            <p className="text-sm text-gray-500 mt-2">Ticket Quantity</p>
            <p className="text-lg font-semibold">{ticket.quantity}</p>
          </div>


        </div>
      </div>

      {/* FULL-WIDTH BUTTON */}
            <Link to={`/ticket/${ticket._id}`} className="btn block w-full text-center  text-white py-3 rounded-lg font-semibold ">
  <div className="wrapper">
    <div className="flower flower1"><div className="petal"></div><div className="petal two"></div></div>
    <div className="flower flower2"><div className="petal"></div><div className="petal three"></div></div>
    <div className="flower flower3"><div className="petal"></div><div className="petal four"></div></div>
    <div className="flower flower4"><div className="petal"></div><div className="petal two"></div></div>
    <div className="flower flower5"><div className="petal"></div><div className="petal three"></div></div>
    <div className="flower flower6"><div className="petal"></div><div className="petal four"></div></div>
    <span className="text text-xl">See Details</span>
  </div>
</Link>
      
    </div>
        </div>
    );
};

export default LatestCard;