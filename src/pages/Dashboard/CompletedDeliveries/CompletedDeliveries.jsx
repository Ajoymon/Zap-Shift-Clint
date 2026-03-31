import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecur from '../../../hooks/useAxiosSecur';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecur();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user?.email, 'driver_assigned'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,
      );
      return res.data;
    },
  });
  const calculatePayout = parcel => {
    if (parcel.senderDistrctis === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.8;
    }
  };
  return (
    <div>
      <h2 className="text-4xl">Completed Deliveries:{parcels.length}</h2>
      <div>
        <h2 className="text-5xl">Assign Rider: {parcels.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>

                <th>created At</th>
                <th>Pickup District</th>
                <th>Cost</th>
                <th>payout</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>

                  <td>{parcel.createdAt}</td>
                  <td>{parcel.senderDistrctis}</td>
                  <td>{parcel.cost}</td>
                  <td>{calculatePayout(parcel)}</td>
                  <td>
                    <button
                      onClick={() => openAssignRiderModal(parcel)}
                      className="btn btn-primary text-black"
                    >
                      Cash out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
