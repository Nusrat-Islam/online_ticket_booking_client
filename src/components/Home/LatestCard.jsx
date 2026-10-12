import {  Plane } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const LatestCard = ({ticket}) => {
    return (

 <div className="w-full h-full flex flex-col bg-base-100 text-base-content rounded-2xl shadow-lg shadow-blue-400 border overflow-hidden">

      {/* IMAGE – FULL WIDTH */}
      <img
        src={ticket.image}
        alt="ticket"
        className="w-full h-44 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-4 flex flex-col flex-1">

        {/* TITLE */}
        <h2 className="text-lg font-bold text-gray-900">
          {ticket.title}
        </h2>

        {/* TRANSPORT */}
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
          <Plane size={18} /> {ticket.transport}
        </p>

        {/* DASHED LINE (ticket feel) */}
        <div className="border-t-2 border-dashed border-blue-300"></div>

        {/* LEFT + RIGHT CONTENT (STACKED) */}
        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="">
            <p >Price(per unit):</p>
            <p className="text-xl font-bold text-blue-700">
              USD {ticket.price}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p>Ticket Quantity:</p>
            <p className="font-semibold">{ticket.quantity}</p>
          </div>

        </div>

        {/* PERKS */}
        <div className="flex flex-wrap gap-2">
          {ticket.perks?.map((perk, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-base-200 text-base-content text-xs rounded-full"
            >
              {perk}
            </span>
          ))}
        </div>

        {/* BUTTON (UNCHANGED STYLE) */}
                    <Link to={`/ticket/${ticket._id}`} className="w-full rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition duration-300 hover:from-sky-700 hover:to-cyan-600 disabled:opacity-60 flex items-center justify-center">

    <span className="text text-md ">See Details</span>
  
</Link> 
      </div>
    </div>

    );
};

export default LatestCard;