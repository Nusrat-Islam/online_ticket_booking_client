import Card from './Card';
import Container from '../Shared/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useState, useEffect, useMemo } from 'react';

const Tickets = () => {
const [searchText, setSearchText] = useState("");
const [transportType, setTransportType] = useState("all");
const [sortOrder, setSortOrder] = useState("default");
const [currentPage, setCurrentPage] = useState(1);

const ticketsPerPage = 6;


const { data: tickets = [], isLoading } = useQuery({
  queryKey: ["approved-tickets"],
  queryFn: async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/flights/all/approved`
    );
    console.log(res)
    return res.data;
  },
});


const filteredTickets = useMemo(() => {
  let data = [...tickets];


  if (searchText.trim()) {
    data = data.filter(ticket =>
      `${ticket.from} ${ticket.to}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }


  if (transportType !== "all") {
    data = data.filter(ticket => ticket.transport === transportType);
  }


  if (sortOrder === "low") {
    data.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    data.sort((a, b) => b.price - a.price);
  }

  return data;
}, [tickets, searchText, transportType, sortOrder]);


useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setCurrentPage(1);
}, [searchText, transportType, sortOrder]);
  // Pagination
  const indexOfLast = currentPage * ticketsPerPage;
  const indexOfFirst = indexOfLast - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <p className='mt-20 text-3xl font-bold text-blue-400 text-center'>All Tickets</p>

      {/* Search, Filter, Sort */}
      <div className="pt-16 mb-6 flex flex-col md:flex-row gap-3">
        {/* Route Search */}
        <div className='flex gap-3'>
          <input
            type="text"
            placeholder="From - To (e.g. Dhaka to Chittagong)"
            className="input input-bordered w-86"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
             <button
      onClick={() => setCurrentPage(1)}
      className="btn btn-primary"
    >
      Search
    </button>
        </div>

        {/* Price Sort */}
        <div className='flex gap-3 items-center'>
          <select
            className="select select-bordered w-full"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
             <button
      onClick={() => setCurrentPage(1)}
      className="btn btn-primary"
    >
      Search
    </button>
        </div>

        {/* Transport Filter */}
        <div className='flex gap-3 items-center'>
          <select
            className='select select-bordered w-full md:w-1/3'
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
          >
            <option value="all">All Transport</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Airplane">Airplane</option>
            <option value="Launch">Launch</option>
          </select>
             <button
      onClick={() => setCurrentPage(1)}
      className="btn btn-primary"
    >
      Search
    </button>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className='pt-16 grid lg:grid-cols-2 gap-5'>
        {currentTickets.length > 0 ? (
          currentTickets.map(ticket => <Card key={ticket._id} ticket={ticket} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">No tickets found</p>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`btn btn-sm ${currentPage === idx + 1 ? "btn-primary" : "btn-outline"}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </Container>
  )
};

export default Tickets;
