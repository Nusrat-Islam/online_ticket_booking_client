import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import useAuth from '../../../hooks/useAuth';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VendorRevenue = () => {
   const {user} = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['vendorRevenue', user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/vendor/revenue-overview/${user?.email}`
      );
      console.log(res)
      return res.data;
    },
    
  });
  console.log(user?.email)


  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load data.</p>;

 

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Failed to load data.</p>;

  const chartData = {
    labels: ['Total Revenue', 'Tickets Sold', 'Tickets Added'],
    datasets: [
      {
        label: 'Stats',
        data: [data.totalRevenue, data.totalTicketsSold, data.ticketsAdded],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Revenue Overview' }
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Revenue Overview</h2>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">${data.totalRevenue}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Tickets Sold</h3>
          <p className="text-2xl font-bold text-green-600">{data.totalTicketsSold}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Tickets Added</h3>
          <p className="text-2xl font-bold text-yellow-600">{data.ticketsAdded}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default VendorRevenue;
