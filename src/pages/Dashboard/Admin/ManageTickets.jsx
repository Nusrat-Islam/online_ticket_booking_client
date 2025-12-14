import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/flights`);
      setTickets(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleVerify = async (id, status) => {
    if (!id) {
      toast.error("Invalid ticket ID!");
      return;
    }

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/flights/verify/${id}`, { verificationStatus: status });
      toast.success(`Ticket ${status === "accepted" ? "approved" : "rejected"} successfully!`);
      fetchTickets();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ticket status");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Manage Tickets</h2>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full min-w-[900px]">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>From → To</th>
              <th>Transport</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Perks</th>
              <th>Departure</th>
              <th>Vendor</th>
              <th>Verification</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 && (
              <tr>
                <td colSpan="11" className="text-center py-6">
                  No tickets found
                </td>
              </tr>
            )}

            {tickets.map(ticket => (
              <tr key={ticket._id}>
                <td>
                  <img src={ticket.image} alt={ticket.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td>{ticket.title}</td>
                <td>{ticket.from} → {ticket.to}</td>
                <td>{ticket.transport || "N/A"}</td>
                <td>৳ {ticket.price}</td>
                <td>{ticket.quantity}</td>
                <td>
                  {ticket.perks?.length > 0
                    ? ticket.perks.join(", ")
                    : "None"}
                </td>
                <td>{ticket.date} {ticket.time}</td>
                <td>{ticket.vendorName}</td>
                <td>
                  <span className={`badge ${ticket.verificationStatus === "pending" ? "badge-warning" : ticket.verificationStatus === "approved" ? "badge-success" : "badge-error"}`}>
                    {ticket.verificationStatus || "pending"}
                  </span>
                </td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-xs btn-success"
                    disabled={ticket.verificationStatus === "approved"}
                    onClick={() => handleVerify(ticket._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    disabled={ticket.verificationStatus === "rejected"}
                    onClick={() => handleVerify(ticket._id, "rejected")}
                  >
                    Reject
                  </button>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
