import { Plane } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const HomeCard = ({ticket}) => {
    console.log(ticket)
    return (
        <div>
               <div className="w-full h-full flex flex-col  mx-auto bg-base-100 text-base-content rounded-2xl shadow-lg shadow-blue-400 border overflow-hidden p-4">

      {/* CARD CONTENT */}
      <div className="flex flex-col md:flex-row gap-6 flex-1">

        {/* LEFT SECTION */}
        <div className="md:w-3/4 flex gap-5 p-5 relative bg-base-100 rounded-xl">

          {/* Ticket Image */}
          <img
            src={ticket.image}
            alt="ticket"
            className="w-36 h-36 object-cover rounded-lg border"
          />

          <div className="flex flex-col justify-between w-full">

            {/* Ticket Title */}
            <h2 className="text-xl font-bold text-base-content">{ticket.title}</h2>


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
        <div className="md:w-3/9 p-4 bg-base-100 flex flex-col justify-between rounded-xl">

          {/* Price & Quantity */}
          <div>
            <p className="text-sm text-base-content/70">Price (per unit)</p>
            <p className="text-2xl font-bold text-base-content/70">USD {ticket.unitPrice}</p>

            <p className="text-sm text-gray-500 mt-2">Ticket Quantity</p>
            <p className="text-lg font-semibold">{ticket.quantity}</p>
          </div>

        </div>
      </div>

      {/* FULL-WIDTH BUTTON */}
     
       <Link to={`/ticket/${ticket._id}`} className="w-full rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition duration-300 hover:from-sky-700 hover:to-cyan-600 disabled:opacity-60 flex items-center justify-center">
  
    <span className="text text-md">See Details</span>

</Link>
    </div>
        </div>
    );
};

export default HomeCard;