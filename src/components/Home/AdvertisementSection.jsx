import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import HomeCard from "./HomeCard";
import Container from "../Shared/Container";
import LatestCard from "./LatestCard";

const AdvertisementSection = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertised-tickets"],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/advertised-tickets`
      );
      return res.data;
    },
  });
  if (isLoading) return null;

  return (
   <Container>
     <section className="my-12">
      <h2 className="text-3xl text-center text-blue-400 font-bold mb-8">
        Advertised Tickets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            >
              <LatestCard ticket={ticket}></LatestCard>
          </div>
        ))}
      </div>
    </section>
   </Container>
  );
};

export default AdvertisementSection;
