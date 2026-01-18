import React from 'react';
import LiveTracking from '../../../assets/live-tracking.png';
import safeddlivery from '../../../assets/safe-delivery.png';
const features = [
  {
    id: 1,
    title: 'Live Parcel Tracking',
    desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    img: LiveTracking,
  },
  {
    id: 2,
    title: '100% Safe Delivery',
    desc: 'We ensure your parcels are handled with the utmost care and delivered securely to their destination every time.',
    img: safeddlivery,
  },
  {
    id: 3,
    title: '24/7 Call Center Support',
    desc: 'Our dedicated support team is available around the clock to assist you with any delivery-related queries.',
    img: safeddlivery,
  },
];

const ParcleTracing = () => {
  return (
    <div className="my-[80px] w-full">
      {/* 🔼 Top full-width dashed line */}
      <div className="w-full border-t border-dashed border-gray-400 mb-10"></div>

      {/* Content */}
      <div className="space-y-8">
        {features.map(item => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-[auto_1px_1fr] gap-6 items-start bg-gray-100 rounded-2xl p-8"
          >
            {/* Image */}
            <img
              className="w-32 mx-auto md:mx-0"
              src={item.img}
              alt={item.title}
            />

            {/* Vertical dashed line (desktop only) */}
            <div className="hidden md:block h-32 border-l border-dashed border-gray-400 mx-auto"></div>

            {/* Content */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔽 Bottom full-width dashed line */}
      <div className="w-full border-t border-dashed border-gray-400 mt-10"></div>
    </div>
  );
};

export default ParcleTracing;
