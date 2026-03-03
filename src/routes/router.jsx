import { createBrowserRouter } from 'react-router';
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home/Home/Home';
import Coverage from '../pages/Coverage/Coverage';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import PrivateRoute from './PrivateRoute';
import Rider from '../pages/Rider/Rider';
import Services from '../pages/Auth/Services/Services';
import AboutUs from '../pages/Auth/AboutUs/AboutUs';
import SendParcel from '../pages/SendParcel/SendParcel';
import DashboardLayout from '../layout/DashboardLayout';
import Myparcels from '../pages/Dashboard/Myparcels/Myparcels';
import Payment from '../pages/Dashboard/Myparcels/Payment/Payment';
import PaymentSuccess from '../pages/Dashboard/Myparcels/Payment/PaymentSuccess';
import PaymentCancelled from '../pages/Dashboard/Myparcels/Payment/PaymentCancelled';
import PaymentHistory from '../pages/Dashboard/Myparcels/PaymetHistory/PaymentHistory';
import ApproveRider from '../pages/Dashboard/Myparcels/ApproveRider/ApproveRider';
import Usermanagement from '../pages/Dashboard/Myparcels/Usermanagement/Usermanagement';
import AdminRoute from './AdminRoute';
import AssignRiders from '../pages/Dashboard/Myparcels/AssignRiders/AssignRiders';
// import AdminRoute from './AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'rider',
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch('/servisCenter.json.json').then(res => res.json()),
      },
      {
        path: 'services',
        element: (
          <PrivateRoute>
            <Services></Services>
          </PrivateRoute>
        ),
      },
      {
        path: 'aboutus',
        Component: AboutUs,
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/servisCenter.json.json').then(res => res.json()),
      },
      {
        path: 'sendparcel',
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch('/servisCenter.json.json').then(res => res.json()),
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'my-parcels',
        Component: Myparcels,
      },
      {
        path: 'payment/:parcelId',
        Component: Payment,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled,
      },
      {
        path: 'payment-history',
        Component: PaymentHistory,
      },
      {
        path: 'approve-riders',
        element: (
          <AdminRoute>
            <ApproveRider></ApproveRider>
          </AdminRoute>
        ),
      },
      {
        path: 'assing-riders',
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: 'user-management',
        // Component: Usermanagement,
        element: (
          <AdminRoute>
            <Usermanagement></Usermanagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
