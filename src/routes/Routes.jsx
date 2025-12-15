import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'

import Profile from '../pages/Dashboard/Common/Profile'

import MainLayout from '../layouts/MainLayout'

import { createBrowserRouter } from 'react-router'
import TicketDetails from '../pages/TicketDetails/TicketDetails'
import Tickets from '../components/Home/Tickets'
import AddTicket from '../pages/Dashboard/Seller/AddTicket'
import MyBookings from '../pages/Dashboard/Customer/MyBookings'

import Payment from '../components/Payment/Payment'
import Transaction from '../pages/Dashboard/Customer/Transaction'
import MyTickets from '../pages/Dashboard/Seller/MyTickets'
import RequestedBookings from '../pages/Dashboard/Seller/RequestedBookings'
import ManageTickets from '../pages/Dashboard/Admin/ManageTickets'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import AdminAdvertiseTickets from '../pages/Dashboard/Admin/AdminAdvertiseTickets'
import VendorRevenue from '../components/Dashboard/Statistics/VendorRevenue'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/ticket/:id',
        element: <TicketDetails />,
      },
      {
        path: '/login',
        element: <Login />
      },
       {
         path: '/signup',
         element: <SignUp /> 
      },
       {
         path: '/all-tickets',
         element:<Tickets></Tickets> 
      },
       {
          path: '/payment-success',
          element: <Payment></Payment>,
        },

    ],
  },

    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path:'overview',
          element: (
            <PrivateRoute>
              <VendorRevenue/>
            </PrivateRoute>
          ),
        },
        {
          path: 'add-ticket',
          element: (
            <PrivateRoute>
              <AddTicket />
            </PrivateRoute>
          ),
        },
        {
          path: 'my-tickets',
          element: (
            <PrivateRoute>
              <MyTickets />
            </PrivateRoute>
          ),
        },
        {
          path: 'manage-tickets',
          element: (
            <PrivateRoute>
              <ManageTickets />
            </PrivateRoute>
          ),
        },
        {
          path: 'transaction',
          element: (
            <PrivateRoute>
              <Transaction/>
            </PrivateRoute>
          ),
        },
        {
          path: 'profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: 'my-bookings',
          element: (
            <PrivateRoute>
              <MyBookings/>
            </PrivateRoute>
          ),
        },
        {
          path: 'requested-bookings',
          element: <RequestedBookings />,
        },
       
        {
          path: 'manage-users',
          element: <ManageUsers />,
        },
       
        {
          path: 'advertise-tickets',
          element: <AdminAdvertiseTickets />,
        },
       
      ],
    },
])