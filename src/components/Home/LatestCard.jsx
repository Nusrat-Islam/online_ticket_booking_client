import {  Plane } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const LatestCard = ({ticket}) => {
    return (

 <div className="w-full bg-white rounded-2xl shadow-lg shadow-blue-400 border overflow-hidden">

      {/* IMAGE – FULL WIDTH */}
      <img
        src={ticket.image}
        alt="ticket"
        className="w-full h-44 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-4">

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
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {perk}
            </span>
          ))}
        </div>

        {/* BUTTON (UNCHANGED STYLE) */}
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