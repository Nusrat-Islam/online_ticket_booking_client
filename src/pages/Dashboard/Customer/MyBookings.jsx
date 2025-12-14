import React from 'react';
import Bookedtickets from './BookedTickets';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const MyBookings = () => {
    const {user} = useAuth()
    const {data:tickets=[], isLoading} = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const result = await axios (`${import.meta.env.VITE_API_URL}/bookings/${user?.email}`)
      return result.data
    },
})
console.log(tickets)

  return (
<div>
  <h4 className='text-center text-3xl font-bold text-blue-400 mt-10 mb-7'>My Bookings</h4>
      <div className='grid md:grid-cols-2 gap-4'>
{
  tickets.map(ticket => <Bookedtickets ticket={ticket}></Bookedtickets>)
}
    </div>
</div>
  );
};

export default MyBookings;