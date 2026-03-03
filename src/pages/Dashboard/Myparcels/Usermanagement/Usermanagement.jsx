import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecur from '../../../../hooks/useAxiosSecur';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const Usermanagement = () => {
  const axiosSecure = useAxiosSecur();
  const [serchText, setSerchText] = useState('');
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users', serchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${serchText || ''}`);
      return res.data;
    },
  });
  const handelmakeauser = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: `${user.displayName} will be marked as Admin!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Admin!',
    }).then(result => {
      if (result.isConfirmed) {
        const roleInfo = { role: 'admin' };

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then(res => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              icon: 'success',
              title: `${user.displayName} is now Admin`,
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };
  const handlemakeAdmin = user => {
    const roleInfo = { role: 'user' };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then(res => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.displayName} marked as asAdmin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl">User{users.length}</h2>
      <p>serch text:{serchText}</p>
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={e => setSerchText(e.target.value)}
          type="search"
          className="grow"
          placeholder="Search users"
        />
      </label>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Others Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => handlemakeAdmin(user)}
                      className="btn bg-red-500"
                    >
                      <FiShieldOff></FiShieldOff>
                    </button>
                  ) : (
                    <button
                      onClick={() => handelmakeauser(user)}
                      className="btn bg-green-500"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
                <th>Action</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usermanagement;
