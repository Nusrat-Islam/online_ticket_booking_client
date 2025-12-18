import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import PurchaseModal from "../../components/Modal/PurchaseModal";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import PurchaseModal from "../../components/PurchaseModal";

const TicketDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [bookingQty, setBookingQty] = useState(1);
  const [countdown, setCountdown] = useState("");

  // ======================
  // Fetch single ticket
  
  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/flights/${id}`
      );
      return res.data;
    },
  });


  // Countdown Timer
  
  useEffect(() => {
    if (!ticket) return;

    const interval = setInterval(() => {
      const departure = new Date(`${ticket.date} ${ticket.time}`);
      const now = new Date();
      const diff = departure - now;

      if (diff <= 0) {
        setCountdown("Departure passed");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  if (isLoading) return <p>Loading...</p>;
  if (!ticket) return <p>Ticket not found</p>;

  const departurePassed =
    new Date(`${ticket.date} ${ticket.time}`) < new Date();
  const outOfStock = ticket.quantity === 0;

  // ======================
  // Booking Submit Handler
  // ======================

  console.log(ticket)
const handleBookingSubmit = async (e) => {
  e.preventDefault();

  const quantity = bookingQty; // <-- use state, not e.target.quantity.value

  // Validation
  if (!quantity || quantity < 1) {
    return toast.error("Please enter a valid quantity!");
  }

  if (quantity > ticket.quantity) {
    return toast.error("Requested quantity exceeds available tickets!");
  }

  const unitPrice = ticket.price;
  const departure = `${ticket.date} ${ticket.time}`;

  const bookingData = {
    
    customerEmail: user.email,
    customerName:user.displayName,
    customerImage:user?.photoURL,
    flightId: ticket._id,
    title: ticket.title,
    image: ticket.image,
    unitPrice,
    quantity,
    totalPrice: unitPrice * quantity,
    from: ticket.from,
    to: ticket.to,
    date: ticket.date,
    time: ticket.time,
    departure,
    status: "Pending",
    bookedAt: new Date().toISOString(),
    vendorName: ticket.vendorName,
    vendorEmail: ticket.vendorEmail,
    vendorImage: ticket.vendorImage,
  };

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/bookings`,
      bookingData
    );

    if (result.data.insertedId) {
      toast.success("Booking request sent!");
      setOpenModal(false);
    }
  } catch (err) {
    console.log(err);
    toast.error("Booking failed!");
  }
};




  return (
    <div className="max-w-4xl mx-auto mt-22 p-6 bg-white rounded-3xl shadow-xl border border-gray-200 relative">

      {/* Countdown Badge */}
      <div className="absolute -top-4 right-6 bg-blue-600 text-white px-4 py-1 rounded-full shadow-lg">
        {countdown}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* LEFT Image */}
        <div className="md:w-1/3">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* RIGHT Details */}
        <div className="flex-1 flex flex-col gap-4 p-4 bg-[#F5F9FF] rounded-2xl shadow-inner">
          
          <h1 className="text-2xl font-bold">{ticket.title}</h1>
          
          <p className="flex items-center gap-2 text-gray-700 font-semibold">
            {ticket.from} → {ticket.to}
          </p>

          <p className="text-gray-500">
            Transport: <span className="font-medium">{ticket.transport}</span>
          </p>

          {/* Perks */}
          <div className="flex flex-wrap gap-2 mt-2">
            {ticket.perks?.map((perk, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full shadow-sm"
              >
                {perk}
              </span>
            ))}
          </div>

          <p className="text-gray-600">
            <strong>Price:</strong> BDT {ticket.price}
          </p>

          <p className="text-gray-600">
            <strong>Available Tickets:</strong> {ticket.quantity}
          </p>

          <p className="text-gray-600">
            <strong>Departure:</strong> {ticket.date} – {ticket.time}
          </p>
        </div>
      </div>

      {/* ======================
          Book Now Button
      ====================== */}
      <button
        disabled={departurePassed || outOfStock}
        onClick={() => setOpenModal(true)}
        className={`btn mt-6 w-full py-3 rounded-xl font-semibold text-white shadow-lg ${
          departurePassed || outOfStock
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1 transition-all"
        }`}
      >
        <div className="wrapper">
          <div className="flower flower1"><div className="petal"></div><div className="petal two"></div></div>
          <div className="flower flower2"><div className="petal"></div><div className="petal three"></div></div>
          <div className="flower flower3"><div className="petal"></div><div className="petal four"></div></div>
          <div className="flower flower4"><div className="petal"></div><div className="petal two"></div></div>
          <div className="flower flower5"><div className="petal"></div><div className="petal three"></div></div>
          <div className="flower flower6"><div className="petal"></div><div className="petal four"></div></div>
          <span className="text">Book Now</span>
        </div>
      </button>

      {/* ======================
          Booking Modal
      ====================== */}
      {openModal && (
        <PurchaseModal onClose={() => setOpenModal(false)}>
          
          <h2 className="text-xl font-bold mb-4">
            Book: {ticket.title}
          </h2>

          <form onSubmit={handleBookingSubmit} className="flex flex-col gap-3">

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                max={ticket.quantity}
                value={bookingQty}
                onChange={(e) => setBookingQty(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full mt-1"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Confirm Booking
            </button>

          </form>

        </PurchaseModal>
      )}
    </div>
  );
};

export default TicketDetails;
