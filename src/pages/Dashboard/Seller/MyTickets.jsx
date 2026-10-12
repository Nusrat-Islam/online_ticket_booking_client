
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch vendor tickets
  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/vendor-tickets/${user.email}`);
      setTickets(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.email) return;
    fetchTickets();
  }, [user]);

  // Delete ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/flights/${id}`);
      toast.success("Ticket deleted successfully!");
      fetchTickets();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ticket");
    }
  };

  // Open modal for update
  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  // Submit updated ticket
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: e.target.title.value,
        from: e.target.from.value,
        to: e.target.to.value,
        price: Number(e.target.price.value),
        quantity: Number(e.target.quantity.value),
        date: e.target.date.value,
        time: e.target.time.value,
        image: e.target.image.value,
      };

      await axios.patch(`${import.meta.env.VITE_API_URL}/flights/${selectedTicket._id}`, updatedData);
      toast.success("Ticket updated successfully!");
      setModalOpen(false);
      fetchTickets();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ticket");
    }
  };

  if (loading) return <p className="text-center py-10 text-base-content"><LoadingSpinner></LoadingSpinner></p>;

  return (
    <div className="min-h-screen p-4 bg-base-100 text-base-content transition-colors duration-300">
      <h2 className="text-3xl font-semibold mb-6 text-blue-500 flex justify-center items-center">My Added Tickets</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length === 0 && (
          <p className="col-span-3 text-center text-gray-500 dark:text-gray-400">
            No tickets added yet
          </p>
        )}

        {tickets?.map(ticket => (
          <div
            key={ticket._id}
            className="card shadow-lg rounded-xl p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-semibold">{ticket.title}</h3>
            <p>{ticket.from} → {ticket.to}</p>
            <p><span className="font-semibold">Transport: </span>{ticket.transport}</p>
            <p><span className="font-semibold">Price:</span> USD {ticket.price}</p>
            <p><span className="font-semibold">Quantity: </span> {ticket.quantity}</p>

            <span className={`badge ${
              ticket.verificationStatus === "pending"
                ? "badge-warning"
                : ticket.verificationStatus === "approved"
                ? "badge-success"
                : "badge-error"
            }`}>
              {ticket.verificationStatus || "pending"}
            </span>

            <div className="flex gap-2 mt-3">
              <button
                className="btn btn-xs btn-primary"
                disabled={ticket.verificationStatus === "rejected"}
                onClick={() => handleOpenModal(ticket)}
              >
                Update
              </button>

              <button
                className="btn btn-xs btn-error"
                disabled={ticket.verificationStatus === "rejected"}
                onClick={() => handleDelete(ticket._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Modal ================= */}
      {modalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-lg p-6 relative transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4">Update Ticket</h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={selectedTicket.title}
                placeholder="Ticket Title"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />

              <input
                type="text"
                name="from"
                defaultValue={selectedTicket.from}
                placeholder="From"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />

              <input
                type="text"
                name="to"
                defaultValue={selectedTicket.to}
                placeholder="To"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />

              <input
                type="number"
                name="price"
                defaultValue={selectedTicket.price}
                placeholder="Price"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />

              <input
                type="number"
                name="quantity"
                defaultValue={selectedTicket.quantity}
                placeholder="Quantity"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />

              <input
                type="date"
                name="date"
                defaultValue={selectedTicket.date}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />

              <input
                type="time"
                name="time"
                defaultValue={selectedTicket.time}
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />

              <input
                type="text"
                name="image"
                defaultValue={selectedTicket.image}
                placeholder="Image URL"
                className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
