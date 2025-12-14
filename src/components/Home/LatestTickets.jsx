import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

const LatestTickets = () => {
  const navigate = useNavigate();

  const { data: tickets = [], isLoading, error } = useQuery({
    queryKey: ["latest-tickets"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/latest-tickets`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading latest tickets...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load tickets</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Latest Tickets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <div key={ticket._id} className="bg-white shadow-lg rounded-xl overflow-hidden">
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-bold">{ticket.title}</h3>
              <p className="text-gray-700">Price: ${ticket.unitPrice}</p>
              <p className="text-gray-700">Quantity: {ticket.quantity}</p>
              <p className="text-gray-700">Transport: {ticket.transport || "N/A"}</p>
              <p className="text-gray-700">
                Perks: {ticket.perks?.length > 0 ? ticket.perks.join(", ") : "None"}
              </p>
              <button
                className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                onClick={() => navigate(`/ticket-details/${ticket._id}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;

