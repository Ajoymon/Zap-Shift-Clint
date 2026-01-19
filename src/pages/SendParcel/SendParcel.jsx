import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const SendParcel = () => {
  const serviceCenter = useLoaderData();
  const regions = serviceCenter.map(c => c.region);
  console.log(regions);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSendParcel = data => {
    console.log(data);
  };
  return (
    <div className="bg-white p-[80px] text-black my-[60px] rounded-2xl">
      <h3 className="text-4xl font-bold ">Send A Parcel</h3>

      <h1 className="font-bold mt-14">Enter your parcel details</h1>
      <div className="w-full border-t mt-[50px] border-gray-400 "></div>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        <div className="mt-8">
          <label class="label mr-4">
            <input
              type="radio"
              value="document"
              {...register('parcelType')}
              className="radio radio-success"
              defaultChecked
            />
            Document
          </label>
          <label class="label">
            <input
              type="radio"
              value="non-document"
              {...register('parcelType')}
              className="radio radio-success"
            />
            Not-Document
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register('parcelName')}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register('parcelWeight')}
              className="input w-full"
              placeholder="Parcel Weight (KG)"
            />
          </fieldset>
        </div>
        <div className="w-full border-t mt-[30px] border-gray-400 "></div>
        <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sender */}
          <fieldset className="fieldset">
            <h1 className="font-bold text-[15px] mb-[10px]">Sender Details</h1>
            {/* Sender Name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register('senderName')}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* Sender Email */}
            <label className="label mt-[20px]">Sender Email</label>
            <input
              type="email"
              {...register('senderEmail')}
              className="input w-full"
              placeholder="Sender Email"
            />
            {/* Sender Address */}
            <label className="label mt-[20px]">Sender Address</label>
            <input
              type="text"
              {...register('senderAddress')}
              className="input w-full"
              placeholder="Sender Address"
            />
            {/* Sender Phone No */}
            <label className="label mt-[20px]">Sender Phone No</label>
            <input
              type="number"
              {...register('senderPhoneNo')}
              className="input w-full"
              placeholder="Sender Phone No"
            />
            {/* Sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select defaultValue="Pick a browser" className="select">
                <option disabled={true}>Pick a region</option>
                <option>Chrome</option>
                <option>FireFox</option>
                <option>Safari</option>
              </select>
              <span className="label">Optional</span>
            </fieldset>

            {/*Sender District*/}
            <label className="label mt-[20px]">Your District</label>
            <input
              type="text"
              {...register('senderDistrict')}
              className="input w-full"
              placeholder="Your District"
            />
            {/* Sender Pickup Instruction*/}
            <label className="label mt-[20px]">Pickup Instruction</label>
            <textarea
              {...register('senderInstruction')}
              className="textarea textarea-bordered w-full h-[107px]"
              placeholder="Pickup Instruction"
            ></textarea>
          </fieldset>
          {/* Receiver */}
          <fieldset className="fieldset">
            <h1 className="font-bold text-[15px] mb-[10px]">
              Receiver Details
            </h1>
            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register('receiverName')}
              className="input w-full"
              placeholder="Receiver Name"
            />
            <label className="label mt-[20px]">Receiver Email</label>
            <input
              type="email"
              {...register('receiverEmail')}
              className="input w-full"
              placeholder="Receiver Email"
            />
            <label className="label mt-[20px]">Receiver Address</label>
            <input
              type="text"
              {...register('receiverAddress')}
              className="input w-full"
              placeholder="Receiver Address"
            />
            <label className="label mt-[20px]">Receiver Phone No</label>
            <input
              type="number"
              {...register('receiverPhoneNo')}
              className="input w-full"
              placeholder="Receiver Phone No"
            />
            <label className="label mt-[20px]">Receiver District</label>
            <input
              type="text"
              {...register('receiverDistrict')}
              className="input w-full"
              placeholder="Receiver District"
            />
            <label className="label mt-[20px]">Delivery Instruction</label>
            <textarea
              {...register('receiverInstruction')}
              className="textarea textarea-bordered w-full h-[107px]"
              placeholder="Receiver Instruction"
            ></textarea>
          </fieldset>
        </div>
        <p className="my-[50px]">* PickUp Time 4pm-7pm Approx.</p>
        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className="btn btn-primary text-black"
        />
      </form>
    </div>
  );
};

export default SendParcel;
