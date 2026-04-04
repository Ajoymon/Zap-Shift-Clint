import React from 'react';
import useRole from '../../../hooks/useRole';
import AdminDashboradHome from './AdminDashboradHome';
import RiderDashboradHome from './RiderDashboradHome';
import UserDashboradHome from './UserDashboradHome';

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <span className="loading loading-spinner text-success"></span>;
  }
  if (role === 'admin') {
    return <AdminDashboradHome></AdminDashboradHome>;
  } else if (role === 'rider') {
    return <RiderDashboradHome></RiderDashboradHome>;
  } else {
    return <UserDashboradHome></UserDashboradHome>;
  }
};

export default DashboardHome;
