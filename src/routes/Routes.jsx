import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'

import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Seller/MyInventory'
import { createBrowserRouter } from 'react-router'
import TicketDetails from '../pages/TicketDetails/TicketDetails'
import Tickets from '../components/Home/Tickets'
import AddTicket from '../pages/Dashboard/Seller/AddTicket'
import MyBookings from '../pages/Dashboard/Customer/MyBookings'
import ManageBookings from '../pages/Dashboard/Seller/ManageBookings'
import Statistics from '../pages/Dashboard/Common/Statisticts'

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
          index: true,
          element: (
            <PrivateRoute>
              <Statistics/>
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
          path: 'my-inventory',
          element: (
            <PrivateRoute>
              <MyInventory />
            </PrivateRoute>
          ),
        },
        {
          path: 'manage-users',
          element: (
            <PrivateRoute>
              <ManageUsers />
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
          path: 'manage-bookings',
          element: <ManageBookings />,
        },
      ],
    },
])