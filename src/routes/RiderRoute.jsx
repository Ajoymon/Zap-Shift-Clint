import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const RiderRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { roleLoadig, role } = useRole();
  if (loading || !user || roleLoadig) {
    return <div>Loading paje</div>;
  }
  if (role !== 'rider') {
    return <div>Akceg Forbiden</div>;
  }
  return children;
};

export default RiderRoute;
