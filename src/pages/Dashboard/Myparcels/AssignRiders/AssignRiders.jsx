import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecur from '../../../../hooks/useAxiosSecur';
import Swal from 'sweetalert2';

const AssignRiders = () => {
  const [selecteParcel, setSelecteParcel] = useState(null);
  const AxiosSecure = useAxiosSecur();
  const riderModalRef = useRef();
  const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
    queryKey: ['parcels,', 'pending-pickup'],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        '/parcels?deliverystatus=pending-pickup',
      );
      return res.data;
    },
  });
  const openAssignRiderModal = parcel => {
    setSelecteParcel(parcel);
    console.log(parcel.senderDistrctis);
    riderModalRef.current.showModal();
  };
  const hendeleAssingnRider = rider => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.Email,
      riderName: rider.Name,
      ParcelId: selecteParcel._id,
    };
    AxiosSecure.patch(`/parcels/${selecteParcel._id}`, riderAssignInfo).then(
      res => {
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelsRefetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Rider has been assigned.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
    );
  };
  const { data: riders = [] } = useQuery({
    queryKey: ['riders', selecteParcel?.senderDistrctis, 'available'],
    enabled: !!selecteParcel,
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/riders?status=approved&district=${
          selecteParcel?.senderDistrctis
        }&workStatus=available`,
      );
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-5xl">Assign Rider: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createdAt}</td>
                <td>{parcel.senderDistrctis}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-primary text-black"
                  >
                    Find riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={riderModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Rider: {riders.length}!</h3>
          {/* table*/}
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id}>
                    <th>{index + 1}</th>
                    <td>{rider.Name}</td>
                    <td>{rider.Email}</td>
                    <td>
                      <button
                        onClick={() => hendeleAssingnRider(rider)}
                        className="btn btn-primary text-black"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
