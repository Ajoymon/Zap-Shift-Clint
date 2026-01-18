import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewsCard = ({ review }) => {
  const {userName,review:testmonial,user_photoURL } = review;
  return (
     <div className="max-w-sm rounded-2xl bg-[#fdecec] p-6 shadow-sm">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-4xl  mb-4 text-primary" />

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed">
       {testmonial}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-5"></div>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-primary "><img className='rounded-full' src={user_photoURL} alt="" /></div>

        {/* Name & Role */}
        <div>
          <h4 className="font-semibold text-gray-800">{userName}</h4>
          <p className="text-xs text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;