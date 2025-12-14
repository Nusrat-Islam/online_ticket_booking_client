import React from 'react';
import TransactedHistory from './TransactedHistory';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const Transaction = () => {
        const {user} = useAuth()
    const {data:payments=[], isLoading} = useQuery({
    queryKey: ['payment', user?.email],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/payment/${user?.email}`)
      return result.data
    },
})
console.log(payments)
    return (
         <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-500">Transaction History</h2>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Ticket Title</th>
              <th className="py-3 px-4">Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <TransactedHistory key={payment._id} payment={payment} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default Transaction;