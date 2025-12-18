import { useQuery } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const AdminAdvertiseTickets = () => {
  // const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  const { data: tickets = [], refetch, isLoading } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      // const res = await axiosSecure.get("/admin/approved-tickets");
      const res = await axios(`${import.meta.env.VITE_API_URL}/admin/approved-tickets`,{headers:{Authorization:`bearer ${user.accessToken}`}})
      return res.data;
    },
  });

  const handleAdvertiseToggle = async (id, currentState) => {
    console.log(id)
    try {
      // await axiosSecure.patch(`/admin/advertise-ticket/${id}`, {
      //   advertise: !currentState,
      // });
     await axios.patch(`${import.meta.env.VITE_API_URL}/admin/advertise-ticket/${id}`,{advertise: !currentState,},{headers:{Authorization:`bearer ${user.accessToken}`}})
   
      toast.success(
        !currentState ? "Ticket Advertised" : "Ticket Unadvertised"
      );
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
      console.log(err)
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Advertise Tickets</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Advertise</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.title}</td>
              <td>${ticket.price}</td>
              <td>{ticket.quantity}</td>
              <td>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={ticket.isAdvertised === true}
                  onChange={() =>
                    handleAdvertiseToggle(
                      ticket._id,
                      ticket.isAdvertised
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAdvertiseTickets;
