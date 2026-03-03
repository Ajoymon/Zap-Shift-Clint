import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecur from '../../../../hooks/useAxiosSecur';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const ApproveRider = () => {
  const [message, setmessage] = useState();
  const axoiosSecure = useAxiosSecur();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axoiosSecure.get('/riders');
      return res.data;
    },
  });
  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axoiosSecure.patch(`/riders/${rider._id}`, updateInfo).then(res => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleApproval = rider => {
    updateRiderStatus(rider, 'approved');
  };
  const handelRejiction = rider => {
    updateRiderStatus(rider, 'rejected');
  };
  return (
    <div>
      <h2 className="text-5xl">Riders pending Approval: {riders.length}</h2>

      {message && <p className="text-green-600 font-bold mt-4">{message}</p>}
      <h2 className="text-5xl">Riders pending Approval:{riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Application status</th>
              <th>Work status</th>

              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.Name}</td>
                <td>{rider.Email}</td>

                <td>{rider.district}</td>
                <td>{rider.workStatus}</td>
                <td>
                  <p
                    className={`${rider.status === 'approved' ? 'text-green-800' : 'text-red-500'}`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>
                  <button className="btn">
                    <FaEye></FaEye>
                  </button>
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaUserCheck />
                  </button>

                  <button
                    onClick={() => handelRejiction(rider)}
                    className="btn"
                  >
                    <IoPersonRemove />
                  </button>
                  <button
                    onClick={() => setmessage('I am Back')}
                    className="btn hover:bg-green-600"
                  >
                    <MdDelete />
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

export default ApproveRider;
