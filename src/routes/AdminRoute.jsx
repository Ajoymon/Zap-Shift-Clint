import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { roleLoadig, role } = useRole();
  if (loading || roleLoadig) {
    return <div>Loading paje</div>;
  }
  if (role !== 'admin') {
    return <div>Akceg Forbiden</div>;
  }
  return children;
};

export default AdminRoute;
