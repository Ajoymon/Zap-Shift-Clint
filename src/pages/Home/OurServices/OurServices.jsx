import React from 'react';

import servis from '../../../assets/service.png'

const servicesData = [
  {
    id: 1,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: servis, // এখানে তুমি icon image path দিতে পারো
  },
  {
    id: 2,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: servis,
  },
  {
    id: 3,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after-sales support.",
    icon: servis,
  },
  {
    id: 4,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: servis,
  },
  {
    id: 5,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon:servis,
  },
  {
    id: 6,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow customers to return or exchange their products with online business merchants.",
    icon: servis,
  },
];


const OurServices = () => {
  return (
    <div className='py-16 px-6 bg-[#03373D]'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-white mb-2'>Our Services</h2>
        <p className='text-white max-w-2xl mx-auto'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          servicesData.map(service => (
            <div key={service.id} className='bg-white rounded-lg p-6 shadow hover:bg-primary transition relative'>
              <div>
                <img src={service.icon} alt={service.title} className='w-12 h-12 mx-auto' />
              </div>
              <h3 className='font-semibold text-lg mb-2 text-center'>{service.title}</h3>
              <p className='text-gray-600 text-sm text-center'>{ service.description}</p>
            </div>
          ))
        }

      </div>
      
    </div>
  );
};

export default OurServices;