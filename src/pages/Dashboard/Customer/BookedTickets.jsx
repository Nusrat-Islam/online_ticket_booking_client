import { useState } from "react";
import Countdown from "react-countdown";
import { ArrowRight, Plane } from "lucide-react";
import axios from "axios";

const BookedTickets = ({ ticket }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const openModal = (ticket) => {
    setModalInfo({
      title: "Confirm Payment",
      message: `Are you sure you want to pay ${ticket.unitPrice * ticket.quantity} USD for this ticket?`,
      confirmColor: "bg-blue-600",
      onConfirm: () => {
      
        setModalOpen(false);
      },
    });
    setModalOpen(true);
  };
 
  const{title,image, from,to ,departure,quantity,unitPrice,customerEmail,customerName,customerImage,vendorEmail,vendorName,vendorImage,status,_id}= ticket || {};
 const totalPrice = unitPrice * quantity;
 console.log(quantity, unitPrice)
 

const handlePayment = async () => {
  const paymentInfo = { bookingsId:_id,
    title, image, from, to, departure, unitPrice,quantity, customerEmail, customerName, customerImage, vendorEmail, vendorName, vendorImage, status };

  try {
    const {data} = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );
    window.location.href = data.url
    console.log("Checkout session created:", data.url);
  } catch (err) {
    console.error("Payment error:", err);
  }
};

  return (
    <div>
          <div className="bg-white rounded-2xl shadow-lg p-5 border">
              <div className="flex  flex-row gap-4">
                {/* LEFT */}
                <div className="md:w-3/4 flex gap-2 p-5 bg-[#F5F9FF] rounded-xl relative">
                  <img
                    src={image}
                    alt="ticket"
                    className="w-40 h-50 object-cover rounded-lg border"
                  />
                  <div className="flex flex-col justify-between w-full">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-gray-700 flex items-center gap-2 ">
                      <span className="font-semibold">{from}</span>
                      <ArrowRight size={18} />
                      <span className="font-semibold">{to}</span>
                    </p>
                   
                   
                    <p className="text-sm font-semibold ">
                      Status:{" "}
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          ticket.status === "accepted"
                            ? "bg-green-600"
                            : ticket.status === "rejected"
                            ? "bg-red-500"
                            : ticket.status === "paid"
                            ? "bg-blue-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {status}
                      </span>
                    </p>
                    {/* Countdown only if NOT rejected */}
{status !== "rejected" && (
  <p className="text-sm text-gray-600 ">
    Time Left: <Countdown date={new Date(departure)} />
  </p>
)}

                  </div>
                </div>

                {/* RIGHT */}
                <div className="md:w-3/9 p-4 bg-[#EBF3FF] flex flex-col justify-between rounded-xl">
                  <p className="text-sm text-gray-500">Price (per unit):</p>
                  <p className="text-xl font-bold text-blue-700">
                    USD {unitPrice}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Booking Quantity:</p>
                  <p className="text-lg font-semibold">{quantity}</p>
                  <p className="text-sm text-gray-500 mt-1">Total Price:</p>
                  <p className="text-xl font-bold text-green-700">{totalPrice} USD</p>
                  <p className="text-sm text-gray-500 mt-1">Departure:</p>
                  <p className="font-semibold">{departure}</p>
                </div>
              </div>

              {/* PAY BUTTON */}
           {ticket.status === "accepted" && (
  <div className="mt-1">
    <button
      className="bg-blue-600 w-full text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
      onClick={() => openModal(ticket)}
    >
      Pay Now
    </button>
  </div>
)}

            </div>
         
      
  

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
            <h3 className="text-lg font-bold mb-4">{modalInfo.title}</h3>
            <p className="mb-4">{modalInfo.message}</p>
            <div className="flex justify-center gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`${modalInfo.confirmColor} text-white px-4 py-2 rounded hover:brightness-90 transition`}
                // onClick={modalInfo.onConfirm}
                onClick={handlePayment}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default BookedTickets;
