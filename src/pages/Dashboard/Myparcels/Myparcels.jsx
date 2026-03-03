import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';

import { FaEdit } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { AiTwotoneDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useAxiosSecur from '../../../hooks/useAxiosSecur';

const Myparcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecur();

  const { data: parcel = [], refetch } = useQuery({
    queryKey: ['myparcels', user?.email],
    queryFn: async () => {
      if (!user?.email) return []; // safeguard
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  const handeleParcelDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then(res => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };
  // const handlePayment = async () => {
  //   const paymentinfo = {
  //     cost: parcel.cost,
  //     parcelName: parcel.senderName,
  //     parcelId: parcel._id,
  //     customer_email: parcel.senderEmail,
  //   };
  //   const res = await axiosSecure.post(
  //     '/payment-checkout-session',
  //     paymentinfo,
  //   );
  //   console.log(res.data.url);
  // };
  const handlePayment = async parcelItem => {
    const paymentinfo = {
      cost: parcelItem.cost,
      parcelName: parcelItem.parcelName,
      parcelId: parcelItem._id,
      senderEmail: parcelItem.senderEmail,
    };

    const res = await axiosSecure.post(
      '/payment-checkout-session',
      paymentinfo,
    );

    window.location.replace(res.data.url);
  };
  return (
    <div>
      <h2>all of my parcels: {parcel.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery status</th>
              <th>trackingId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcel.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === 'paid' ? (
                    <span className="text-green-500">paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-sm btn-primary text-black"
                    >
                      pay
                    </button>
                  )}
                </td>
                <td>{parcel.deliverystatus}</td>
                <td>{parcel.trackingId}</td>
                <td>
                  <button className="btn btn-square hover:bg-green-500">
                    <IoSearch />
                  </button>
                  <button className="btn btn-square mx-2 hover:bg-primary">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handeleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-red-500"
                  >
                    <AiTwotoneDelete />
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

export default Myparcels;
