import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import HomeCard from "./HomeCard";
import Container from "../Shared/Container";

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
      <h2 className="text-3xl font-bold text-center mb-8">
        ✈️ Advertised Tickets
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            >
              <HomeCard ticket={ticket}></HomeCard>
          </div>
        ))}
      </div>
    </section>
   </Container>
  );
};

export default AdvertisementSection;
