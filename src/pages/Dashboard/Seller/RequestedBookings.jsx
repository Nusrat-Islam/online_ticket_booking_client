
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


const RequestedBookings = () => {
    const [Bookings, setBookings] = useState([]);
    const {user} = useAuth()
    // const axiosSecure = useAxiosSecure()
    const {data:bookings=[], isLoading} = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      // const result = await axiosSecure ('/requested-bookings')
      const result =await axios(`${import.meta.env.VITE_API_URL}/requested-bookings`,
        {headers:{Authorization:`bearer ${user.accessToken}`}})
      return result.data
    },
})
console.log(bookings)

 const handleStatusChange = async (bookingId, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/bookings/status/${bookingId}`,{ status },
        {headers:{Authorization:`bearer ${user.accessToken}`}})

      // Update local state instantly
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b))
      );

      // Show toast
      if (status === "accepted") {
        toast.success("Booking accepted!");
      } else if (status === "rejected") {
        toast.error("Booking rejected!");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">
        Requested Bookings
      </h2>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>User</th>
              <th>Ticket</th>
              <th>Qty</th>
              <th>Total</th>
           
              <th className="text-center">Action</th>
            </tr>
          </thead>

        <tbody>
  {bookings.length === 0 && (
    <tr>
      <td colSpan="6" className="text-center py-6">
        No booking requests found
      </td>
    </tr>
  )}

  {bookings.map(b => (
    <tr key={b._id}>
      <td>
        <p className="font-medium">{b.customerName}</p>
        <p className="text-sm text-gray-500">{b.customerEmail}</p>
      </td>

   
      <td>{b.title}</td>

      
      <td>{b.quantity}</td>

  
      <td className="font-semibold">${b.totalPrice}</td>

        <td className="flex gap-2 justify-center">
                <button
                  disabled={b.status !== "pending"}
                  className="btn btn-xs btn-success"
                  onClick={() => handleStatusChange(b._id, "accepted")}
                >
                  Accept
                </button>

                <button
                  disabled={b.status !== "pending"}
                  className="btn btn-xs btn-error"
                  onClick={() => handleStatusChange(b._id, "rejected")}
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

export default RequestedBookings;
