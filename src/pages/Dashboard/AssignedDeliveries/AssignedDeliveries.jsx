import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecur from '../../../hooks/useAxiosSecur';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecur();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user?.email, 'driver_assigned'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
      );
      return res.data;
    },
  });
  const hendeleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    let messeg = `parcel Status is updated with ${status.split('_').join(' ')}`;
    axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo).then(res => {
      if (res.data.modifiedCount) {
        refetch();
        console.log(parcel.deliveryStatus);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: messeg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl">Parcels pending pickup: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === 'driver_assigned' ? (
                    <>
                      <button
                        onClick={() =>
                          hendeleDeliveryStatusUpdate(parcel, 'rider_arriving')
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-black">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Delivery accepted</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      hendeleDeliveryStatusUpdate(parcel, 'parcel_picked_up')
                    }
                    className="btn btn-primary text-black"
                  >
                    Mark as picked up
                  </button>
                  <button
                    onClick={() =>
                      hendeleDeliveryStatusUpdate(parcel, 'parcel_delivered')
                    }
                    className="btn btn-primary text-black mx-2"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
