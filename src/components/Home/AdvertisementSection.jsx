import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

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
    <section className="my-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        ✈️ Advertised Tickets
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border rounded-xl shadow p-4 bg-white"
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-3">
              {ticket.title}
            </h3>

            <p className="text-gray-600">
              Transport: {ticket.transportType}
            </p>

            <p className="text-gray-600">
              Perks: {ticket.perks?.join(", ")}
            </p>

            <p className="font-semibold mt-2">
              Price: ${ticket.unitPrice}
            </p>

            <p className="text-sm">
              Quantity: {ticket.quantity}
            </p>

            <Link
              to={`/flights/${ticket._id}`}
              className="btn btn-primary w-full mt-3"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;
