import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecurs from '../../hooks/useAxiosSecur';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
  // Ame reakct hook forme data Asba
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axoiosSecure = useAxiosSecurs();
  // amr json API taka data Asba
  const serviceCenter = useLoaderData();
  // Amr reginons deta dekaba
  const navigate = useNavigate();

  const regionsDuplicate = serviceCenter.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // explore useMemo
  const senderRegion = useWatch({ control, name: 'senderRegin' });
  const receiverRegion = useWatch({ control, name: 'receiverRegin' });
  //  Amr dectit data dekaba
  const districtsByRegin = region => {
    // if (!region) {
    //   region = 'Dhaka';
    // }
    const reginonDistricts = serviceCenter.filter(c => c.region === region);
    const districts = reginonDistricts.map(d => d.district);

    return districts;
  };

  const handleSendParcel = data => {
    console.log(data);
    const isDocument = data.parcelType === 'document';
    const isSmaeDistrict = data.receiverDistrict === data.senderDistrctis;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSmaeDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSmaeDistrict ? 110 : 150;
      } else {
        const minCharge = isSmaeDistrict ? 110 : 150;
        const extraweight = parcelWeight - 3;
        const extraCharge = isSmaeDistrict
          ? extraweight * 4
          : extraweight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log(cost);
    data.cost = cost;
    Swal.fire({
      title: 'Agree with the cost ?',
      text: `You will be chargee ${cost} taka!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirem and Continue Payment!',
    }).then(result => {
      if (result.isConfirmed) {
        //
        axoiosSecure.post('/parcels', data).then(res => {
          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'parcel has created. please pay',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
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
          {/* ---------------------------------------------------------------------------- */}
          {/* Sender */}
          <fieldset className="fieldset">
            <h1 className="font-bold text-[15px] mb-[10px]">Sender Details</h1>

            {/* Sender Name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register('senderName')}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* Sender Email */}
            <label className="label mt-[20px]">Sender Email</label>
            <input
              type="email"
              {...register('senderEmail')}
              defaultValue={user?.email}
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
              <select
                {...register('senderRegin')}
                defaultValue="Dhaka"
                className="select"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* render dricts */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>

              <select
                {...register('senderDistrctis')}
                defaultValue="Dhaka"
                className="select"
              >
                <option value="" disabled>
                  Pick a District
                </option>

                {districtsByRegin(senderRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Sender Pickup Instruction*/}
            <label className="label mt-[20px]">Pickup Instruction</label>
            <textarea
              {...register('senderInstruction')}
              className="textarea textarea-bordered w-full h-[107px]"
              placeholder="Pickup Instruction"
            ></textarea>
          </fieldset>
          {/* ------------------------------------------- */}
          {/* Receiver */}
          <fieldset className="fieldset">
            <h1 className="font-bold text-[15px] mb-[10px]">
              Receiver Details
            </h1>
            {/* Receiver name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register('receiverName')}
              className="input w-full"
              placeholder="Receiver Name"
            />
            {/* Receiver email */}
            <label className="label mt-[20px]">Receiver Email</label>
            <input
              type="email"
              {...register('receiverEmail')}
              className="input w-full"
              placeholder="Receiver Email"
            />
            {/* Receiver Addrece */}
            <label className="label mt-[20px]">Receiver Address</label>
            <input
              type="text"
              {...register('receiverAddress')}
              className="input w-full"
              placeholder="Receiver Address"
            />
            {/* Receiver Phone nomber */}
            <label className="label mt-[20px]">Receiver Phone No</label>
            <input
              type="number"
              {...register('receiverPhoneNo')}
              className="input w-full"
              placeholder="Receiver Phone No"
            />
            {/* Receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register('receiverRegin')}
                defaultValue="Dhaka"
                className="select"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register('receiverDistrict')}
                defaultValue="pick a District"
                className="select"
              >
                <option disabled={true}>Pick a region</option>
                {districtsByRegin(receiverRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver Delivery instruction */}
            <label className="label mt-[20px]">Delivery Instruction</label>
            <textarea
              {...register('receiverInstruction')}
              className="textarea textarea-bordered w-full h-[107px]"
              placeholder="Receiver Instruction"
            ></textarea>
          </fieldset>
        </div>
        {/* time---------------------------------- */}
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
