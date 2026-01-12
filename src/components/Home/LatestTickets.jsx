import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import LatestCard from "./LatestCard";
import Container from "../Shared/Container";

const LatestTickets = () => {
 
const { data: tickets = [], isLoading, error } = useQuery({
  queryKey: ["latest-tickets"],
  queryFn: async () => {
    const res = await axios(`${import.meta.env.VITE_API_URL}/latest-tickets`);
    console.log("Latest tickets:", res.data); // 🔍 check console
    return res.data;
  },
});



  if (isLoading) return <p className="text-center py-10">Loading latest tickets...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load tickets</p>;

  return (
   <Container>
       <div className="p-6 mb-10">
      <h2 className="text-3xl text-center text-blue-400 font-bold mb-6">Latest Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {tickets.map(ticket => (
          <div key={ticket._id}>
            <LatestCard ticket={ticket}></LatestCard>
          </div>
        ))}
      </div>
    </div>
   </Container>
  );
};

export default LatestTickets;

